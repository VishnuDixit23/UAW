package com.example.Dtos;

import java.time.LocalDateTime;




public class ApiResponse<T> {
    
    private boolean success;      // Batayega ki request fail hui ya pass
    private String message;
    private String phoneNumber;
    private T data;              
    private LocalDateTime timestamp = LocalDateTime.now();
    public ApiResponse(){
    	
    }
	public ApiResponse(boolean success, String message) {
		super();
		this.success = success;
		this.message = message;
	}
	public ApiResponse(boolean success, String message,String phoneNumber) {
		super();
		this.success = success;
		this.message = message;
		this.phoneNumber = phoneNumber;
	}
	public ApiResponse(boolean success, String message,String phoneNumber,T data) {
		super();
		this.success = success;
		this.message = message;
		this.phoneNumber =phoneNumber;
		this.data = data;
	}
	
	
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public T getData() {
		return data;
	}
	public void setData(T data) {
		this.data = data;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
    
   
}