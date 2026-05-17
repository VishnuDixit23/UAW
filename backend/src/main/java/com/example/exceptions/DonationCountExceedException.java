package com.example.exceptions;

public class DonationCountExceedException extends RuntimeException {

	private static final long serialVersionUID = 1L;
    
    public DonationCountExceedException(String message) {
        super(message);
    }
}
