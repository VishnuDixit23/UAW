package com.example.controllers;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Dtos.ApiResponse;
import com.example.Dtos.DonationDetailsDTO;
import com.example.Dtos.DonationRequest;
import com.example.Dtos.PaymentRequest;
import com.example.services.DonationService;

@RestController
@RequestMapping("/payment/donation")
@EnableMethodSecurity
@CrossOrigin(origins = {"https://unitedforanimalwelfare.com", "https://unitedforanimalwelfare.org", "https://unitedforanimalwelfare.in","http://localhost:5173"})
public class DonationController {

	@Autowired
	private DonationService donationService;

	@PostMapping("/transactionByLinkSend")
	public ResponseEntity<?> createTransaction(@RequestBody PaymentRequest request) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ApiResponse(true, "Link generated and shared on email,watsapp", request.getPhoneNumber(),
						donationService.saveDonationWithPaymentLink(request)));
	}

	@PostMapping("/transactionStatus")
	public ResponseEntity<?> fetchTransactionStatus(@RequestBody String transactionId) {
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Transaction status updated", null,
				donationService.fetchTransactionStatus(transactionId)));
	}

	@PostMapping("/transactionOnWebsite")
	public ResponseEntity<?> initiatePayment(@RequestBody PaymentRequest request) {
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Link generated",
				request.getPhoneNumber(), donationService.saveDonationFromSite(request)));
	}

	@PostMapping("/onCashPayment")
	public ResponseEntity<?> onCashPayment(@RequestBody PaymentRequest request) {
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, "Cash Payment Submitted Successfully",
				request.getPhoneNumber(), donationService.saveDonationOnCash(request)));
	}
	
	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/history/sort")
	public ResponseEntity<Page<DonationDetailsDTO>> getHistoryBySort(@RequestBody DonationRequest request) {
		Page<DonationDetailsDTO> result = donationService.getAllDonationsBySort(request.getPage(), request.getSize(),
				request.getField());
		return ResponseEntity.ok(result);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/history/phone")
	public ResponseEntity<Page<DonationDetailsDTO>> getHistoryByUser(@RequestBody DonationRequest request) {
		Page<DonationDetailsDTO> result = Page.empty();
		if (StringUtils.isNoneBlank(request.getPhoneNumber()))
			result = donationService.getDonationsByUser(request.getPage(), request.getSize(), request.getPhoneNumber());
		return ResponseEntity.ok(result);
	}

	@PreAuthorize("hasAuthority('ADMIN')")
	@PostMapping("/history/mode")
	public ResponseEntity<Page<DonationDetailsDTO>> getHistoryByMode(@RequestBody DonationRequest request) {
		Page<DonationDetailsDTO> result = Page.empty();
		if (StringUtils.isNoneBlank(request.getMode()))
			result = donationService.getDonationsByPaymentMode(request.getPage(), request.getSize(), request.getMode());
		return ResponseEntity.ok(result);
	}

}
