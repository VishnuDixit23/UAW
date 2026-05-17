package com.example.services;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.CompletableFuture;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.Dtos.DonationDetailsDTO;
import com.example.Dtos.PaymentRequest;
import com.example.dao.DonationServiceDao;
import com.example.models.Donation;
import com.example.models.User;
import com.example.user.repository.DonationRepository;
import com.example.user.services.UserRegistrationService;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class DonationService {
	
    private static final Logger logger = LoggerFactory.getLogger(DonationService.class);

			
	@Autowired
	private DonationServiceDao donationServiceDao;
	
	 @Autowired
	 private EasebuzzService easebuzzService;
	 
	 @Autowired
	 private UserRegistrationService userRegistrationService;
	 
	 @Autowired
	 EmailService emailService;
	 
	 @Autowired
	 private DonationRepository donationRepository;
	 
	 @Autowired
	 private PdfService pdfService;
	 
	 @Autowired
	 private CloudinaryService cloudinaryService;

	 @Autowired
	 private WhatsAppService whatsAppService;
	 
	 @Value("${easebuzz.application.domain.url}")
	 private String applicationDomainUrl;
		 
	
	@SuppressWarnings("rawtypes")
	public String saveDonationWithPaymentLink(PaymentRequest request) {
		
		String transactionId = userRegistrationService.generateCompactTxnId();
		Donation donation = donationServiceDao.validateAndsaveDonation(request, transactionId, false);
		User user = donation.getUser();
	    Map data = easebuzzService.createEasyCollectLink(user.getFirstname(), user.getPhoneNumber(), user.getEmail(), donation.getAmount() + "", donation.getTransactionId());
	    if (data != null) {
	    	 String subject = "🐾 Your small contribution can save a life!";
	    	 String paymentUrl = (String) data.get("payment_url");
	    	 String body = this.getBody(user.getFirstname(), paymentUrl, transactionId);
	    	 emailService.sendEmailForDonationLink(request.getEmail(), subject, body);
	    }
	    return transactionId; 
	}
	
	public String saveDonationFromSite(PaymentRequest request) {	
		String transactionId = userRegistrationService.generateCompactTxnId();
		Donation donation = donationServiceDao.validateAndsaveDonation(request, transactionId, false);
		User user = donation.getUser();
	    return easebuzzService.initiatePayment(user.getFirstname(), user.getPhoneNumber(), user.getEmail(), donation.getAmount() + "", donation.getTransactionId());	    
	}
     
	public String saveDonationOnCash(PaymentRequest request) {	
 		String transactionId = userRegistrationService.generateCompactTxnId();
 		Donation donation = donationServiceDao.validateAndsaveDonation(request, transactionId, true);
 		this.handlePaymentSuccess(donation);
 	    return transactionId;	    
 	}
	
	@SuppressWarnings("unchecked")
	public String fetchTransactionStatus(String transactionId) {
		String finalStatus = "PENDING";
		Map<String, Object> apiResponse = easebuzzService.checkTransactionStatus(transactionId);
		if (apiResponse != null && (Boolean) apiResponse.get("status")) {
		    List<Map<String, Object>> msgList = (List<Map<String, Object>>) apiResponse.get("msg");
		    if (!msgList.isEmpty()) {
		        Map<String, Object> txnData = msgList.get(0);
		        finalStatus = (String) txnData.get("status"); // success, failure, pending		        
		    }
		}
		return donationServiceDao.updateAndGetStatus(transactionId, finalStatus);
	}
	

	private String getBody(String userName, String paymentUrl, String transactionId) {
		if (Objects.nonNull(transactionId) && Objects.nonNull(paymentUrl)) {
			String htmlContent = """
			        <html>
			            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
			                <div style="max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
			                    <h2 style="color: #28a745;">Hi %s, 🐾</h2>
			                    <p>Hope you're having a great day!</p>
			                    <p>We are reaching out to you for our <b>Animal Welfare Initiative</b>. Your small contribution can provide food and urgent medical care to stray animals in need.</p>
			                    
			                    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
			                        <p style="margin: 0;"><b>Transaction ID:</b> %s</p>
			                        <p style="margin: 5px 0 0 0;"><b>Purpose:</b> Stray Animal Welfare</p>
			                    </div>

			                    <p>Please click the button below to complete your donation safely via Easebuzz:</p>
			                    
			                    <div style="text-align: center; margin: 30px 0;">
			                        <a href="%s" 
			                           style="background-color: #28a745; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; display: inline-block;">
			                           Donate Now &amp; Save a Life
			                        </a>
			                    </div>

			                    <p style="font-size: 12px; color: #777;">
			                        If the button doesn't work, copy-paste this link: <br>
			                        <a href="%s">%s</a>
			                    </p>

			                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
			                    <p>Warm regards,<br>
			                    <strong>Animal Welfare Team</strong></p>
			                </div>
			            </body>
			        </html>
			        """.formatted(userName, transactionId, paymentUrl, paymentUrl, paymentUrl);
			return htmlContent;
		}
		return null;
	}
	
	
	public void handlePaymentSuccess(Donation donation) {
		User user = donation.getUser();
		String address = this.getFullAddress(user);
		Map<String, Object> data = this.prepareReceiptData(user, address, donation);
		CompletableFuture.supplyAsync(() -> {
			try {
				// Step 1: Generate PDF
				return pdfService.generate80GReceipt(data);
			} catch (Exception e) {
				logger.error("PDF Generation Failed {} {}", e.getMessage(), e);
				throw new RuntimeException("PDF Generation Failed", e);
			}
		}).thenApply(pdfBytes -> {
			// Step 2: Upload to Cloudinary
			String receiptId = (String) data.get("receiptId");
			return cloudinaryService.uploadPdf(pdfBytes, receiptId);
		}).thenAccept(pdfUrl -> {
			logger.info("pdfUrl : {},", pdfUrl);
			this.sentMailwithAttchment(user.getFirstname(), user.getEmail(), donation.getTransactionId(), pdfUrl);
			this.sentWatsappWithAttachement((String) data.get("mobile"), user.getFirstname(), (String) data.get("amount"), pdfUrl);
		}).exceptionally(ex -> {
			// Global Error Handling for this thread
			logger.info("Pipeline failed: {},", ex.getMessage());
			return null;
		});
	}

	private Map<String, Object> prepareReceiptData(User user, String address, Donation donation) {
		Map<String, Object> data = new HashMap();
		data.put("address", address);
		data.put("receiptId", "80G-Auto_" + donation.getTransactionId());
		data.put("donorName", user.getFirstname().toString());
		data.put("amount", String.valueOf(donation.getAmount()));
		data.put("date", donation.getCreatedAt().toString());
		String cleanMobile = user.getPhoneNumber().replaceAll("[^0-9]", "");
		data.put("mobile", cleanMobile);
		data.put("logoUrl", "https://res.cloudinary.com/dfqg5opfb/image/upload/w_150,q_auto:eco,f_png/v1778093372/AnimalWelfareLogo_bqyhay.png");
		return data;
	}

	private void sentWatsappWithAttachement(String cleanMobile, String firstname, String amount, String pdfUrl) {
		CompletableFuture.runAsync(() -> {
			whatsAppService.sendPdfReceipt(cleanMobile, firstname, amount, pdfUrl);
		}).exceptionally(ex -> {
			logger.error("Sent watsapp failed: {},", ex.getMessage());
			return null;
		});
	}

	private void sentMailwithAttchment(String firstname, String email, String transactionId, String pdfUrl) {
		CompletableFuture.supplyAsync(() -> {
			String emailBody = "<h3>Hi " + firstname
					+ "</h3><p>Thank you for supporting Animal Welfare. Your receipt is attached.</p>";
			return emailService.sendEmailWithAttachment(email,
					"Donation Receipt - 80G-Auto_" + transactionId, emailBody, pdfUrl);
		}).exceptionally(ex -> {
			logger.error("Sent email failed: {},", ex.getMessage());
			return null;
		});
	}

	private String getFullAddress(User user) {
		StringBuilder str = new StringBuilder();
		if (StringUtils.isNoneBlank(user.getAddress1())) {
			str.append(user.getAddress1());
		}
		if (StringUtils.isNoneBlank(user.getAddress2())) {
			str.append(" " + user.getAddress2());
		}
        if (StringUtils.isNoneBlank(user.getCity())) {
        	str.append(" " + user.getCity());
		}
        if (StringUtils.isNoneBlank(user.getState())) {
        	str.append(" " + user.getState());
		}
        if (StringUtils.isNoneBlank(user.getPincode())) {
        	str.append(" " + user.getPincode());
		}
		return str.toString();
	}
	
	
	public void updateTransactionStatus(Map<String, String> params, HttpServletResponse response) throws IOException {
		boolean isHashMatched = false;
		   String txnId = params.get("txnid");
		   String amount = params.get("amount");
		   String status = params.get("status") != null ? params.get("status").toUpperCase() : "PENDING";
		   isHashMatched = easebuzzService.verifyEasebuzzHash(params);
		   if (StringUtils.isNoneBlank(txnId) && !donationServiceDao.isTransactionSuccessOrNotExist(txnId)) {
			   params.forEach((key, value) -> {
				   logger.info("key {} , value {}", key, value);
			   });
			   if (isHashMatched && "success".equalsIgnoreCase(status)) {
				   String cardType = params.containsKey("card_type") ? params.get("card_type") : null;
				   String paymentMode = params.containsKey("mode") ? params.get("mode") : null;   
				   Donation donation = donationServiceDao.completeDonation(txnId, status, cardType, paymentMode);
			       this.handlePaymentSuccess(donation);
			    } else {
			    	if (response != null && !response.isCommitted()) {
			    		response.sendRedirect(applicationDomainUrl + "/payment-failure");
			    	}
			    }
		  }
		   if (isHashMatched && response != null && !response.isCommitted()) {
	    	   String redirectUrl = applicationDomainUrl + "/payment-success?txnid=" + txnId + "&amount=" + amount;
			    response.sendRedirect(redirectUrl);
	       }
	}
	
	public void updateTransactionFailStatus(Map<String, String> params, HttpServletResponse response) throws IOException {
		boolean isHashMatched = false;
		   String txnId = params.get("txnid");
		   String status = donationServiceDao.getTransactionStatus(txnId);
		   if (StringUtils.isNoneBlank(txnId) && !"SUCCESS".equalsIgnoreCase(status) && !"FAILED".equalsIgnoreCase(status)) {
			   String amount = params.get("amount");
			   params.forEach((key, value) -> {
				   logger.info("key {} , value {}", key, value);
			   });
			  isHashMatched = easebuzzService.verifyEasebuzzHash(params);
			  if (isHashMatched && !"success".equalsIgnoreCase(params.get("status"))) {
			       if (response != null && !response.isCommitted()) {
			    	   String redirectUrl = applicationDomainUrl + "/payment-failure?txnid=" + txnId + "&amount=" + amount;
					    response.sendRedirect(redirectUrl);
			       }
			    } else {
			    	if (response != null && !response.isCommitted()) {
			    		response.sendRedirect(applicationDomainUrl + "/payment-failure");
			    	}
			    }
		  }
	}
	
	
	public Page<DonationDetailsDTO> getAllDonationsBySort(int page, int size, String field) {
	    return donationServiceDao.getAllDonationsBySort(page, size, field);
	}
	
	public Page<DonationDetailsDTO> getDonationsByUser(int page, int size, String phoneNumber) {
		return donationServiceDao.getDonationsByUser(page, size, phoneNumber);
	}
	
	public Page<DonationDetailsDTO> getDonationsByPaymentMode(int page, int size, String mode) {
		return donationServiceDao.getDonationsByPaymentMode(page, size, mode);
	}

}
