package com.example.dao;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.Dtos.DonationDetailsDTO;
import com.example.Dtos.PaymentRequest;
import com.example.exceptions.DonationCountExceedException;
import com.example.exceptions.UserNotFoundException;
import com.example.models.Donation;
import com.example.models.User;
import com.example.user.repository.DonationRepository;
import com.example.user.repository.UserRepository;

@Repository
public class DonationServiceDao {
	
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private DonationRepository donationRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	@Transactional
	public Donation validateAndsaveDonation(PaymentRequest request, String transactionId, boolean isOnCash) {
		
	  User user;
	  Optional<User> existingUser = userRepository.findByPhoneNumber(request.getPhoneNumber());

	  if (existingUser.isPresent()) {
		  user = existingUser.get();
	  } else if (isOnCash) {
		  // Auto-register the donor for cash payments (admin adding on behalf)
		  user = new User();
		  user.setFirstname(request.getName() != null ? request.getName() : "Cash Donor");
		  user.setPhoneNumber(request.getPhoneNumber());
		  user.setEmail(request.getEmail());
		  user.setPassword(passwordEncoder.encode(request.getPhoneNumber()));
		  user.setRole("USER");
		  user = userRepository.save(user);
	  } else {
		  throw new UserNotFoundException("User not found Please register first!");
	  }
	
	  if (!isOnCash) {
		  // 2. 24-hour limit check karo
		  LocalDateTime limit = LocalDateTime.now().minusHours(24);
		  long count = donationRepository.countRecentDonations(user.getPhoneNumber(), limit);
		
		  if (count >= 3) {
		      throw new DonationCountExceedException("Daily limit reached!");
		  }
	  }
	  Donation donation = new Donation();
	  // 3. Save karo
	  donation.setUser(user);
	  donation.setAmount(request.getAmount());
	  if (isOnCash) {
		  donation.setStatus("SUCCESS"); 
		  donation.setPaymentMode("CASH");
	  }
	  donation.setTransactionId(transactionId);
	  Donation savedDonation = donationRepository.save(donation);
	  
	// "MAGIC TRICK": Return karne se pehle proxy initialize kar do
	    Hibernate.initialize(savedDonation.getUser()); 
	    // Ya phir savedDonation.getUser().getFirstname() ko touch kar lo
	  return savedDonation;
	}
	
	

	@Transactional
	public String updateAndGetStatus(String transactionId, String apiStatus) {
	    // Fetch yahan andar karo taaki connection fresh rahe
	    Donation donation = donationRepository.findByTransactionId(transactionId);
	    
	    if (donation == null)
	    	return "NOT_FOUND";

	    // Agar API success hai aur DB success nahi hai, toh update karo
	    if ("success".equalsIgnoreCase(apiStatus) && !"SUCCESS".equals(donation.getStatus())) {
	        donation.setStatus("SUCCESS");
	        donationRepository.save(donation); // Optional: Dirty checking will handle this too
	        return "SUCCESS";
	    }
	    
	    return donation.getStatus(); // Purana status return karo (Pending/Failure)
	}
	
	@Transactional
	public boolean isTransactionSuccessOrNotExist(String txnId) {
		Donation donation = donationRepository.findByTransactionId(txnId);
		if (donation == null || "SUCCESS".equalsIgnoreCase(donation.getStatus())) {
			return true;
		}
		return false;
	}
	
	@Transactional
	public String getTransactionStatus(String txnId) {
		Donation donation = donationRepository.findByTransactionId(txnId);
		if (Objects.nonNull(donation)) {
			return donation.getStatus();
		}
		return "";
	}
	
	@Transactional // Pura method ek transaction mein
    public Donation completeDonation(String txnId, String status, String cardType, String paymentMode) {
        Donation donation = donationRepository.findByTransactionId(txnId);
        donation.setStatus(status);
        donation.setCardType(cardType);
        donation.setPaymentMode(paymentMode);
        donationRepository.save(donation);
        Hibernate.initialize(donation.getUser()); // create proxy object so that it can be used outside of transaction
        return donation;
    }
	
	@Transactional(readOnly = true)
	public Page<DonationDetailsDTO> getAllDonationsBySort(int page, int size, String field) {
		Pageable pageable = null;
		if (StringUtils.isNotBlank(field)) {
			 pageable = PageRequest.of(page, size, Sort.by(field).descending());
		} else {
			 pageable = PageRequest.of(page, size);
		}
	    return donationRepository.findDonationDetails(pageable);
	}
	
	@Transactional(readOnly = true)
	public Page<DonationDetailsDTO> getDonationsByUser(int page, int size, String phoneNumber) {
		Pageable pageable = PageRequest.of(page, size);
		return donationRepository.getDonationsByUser(phoneNumber, pageable);
	}
	
	@Transactional(readOnly = true)
	public Page<DonationDetailsDTO> getDonationsByPaymentMode(int page, int size, String mode) {
		Pageable pageable = PageRequest.of(page, size);
		return donationRepository.findDonationDetailsByPaymentMode(mode, pageable);
	}

}
