package com.example.Dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class DonationDetailsDTO {
    private String name;
    private String email;
    private String phoneNumber;
    private String transactionId; // Naya field
    private BigDecimal amount;
    private String paymentMode;
    private String status;
    private LocalDateTime createdAt;

    // Updated Constructor
    public DonationDetailsDTO(String name, String email, String phoneNumber, String transactionId, BigDecimal amount, String paymentMode, String status, LocalDateTime createdAt) {
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.transactionId = transactionId;
        this.amount = amount;
        this.paymentMode = paymentMode;
        this.status = status;
        this.createdAt = createdAt;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getPaymentMode() {
		return paymentMode;
	}

	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
    
}
