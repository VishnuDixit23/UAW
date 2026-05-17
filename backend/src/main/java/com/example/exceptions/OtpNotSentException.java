package com.example.exceptions;

public class OtpNotSentException extends RuntimeException {
	
	 private static final long serialVersionUID = 1L;
	    
	    public OtpNotSentException(String message) {
	        super(message);
	    }

}
