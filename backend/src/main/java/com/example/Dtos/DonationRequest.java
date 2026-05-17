package com.example.Dtos;

public class DonationRequest {
	
	Integer page;
	Integer size;
	String field;
	String phoneNumber;
	String mode;
	
	public DonationRequest(Integer page, Integer size, String field,String phoneNumber,String mode) {
		super();
		this.page = page;
		this.size = size;
		this.field = field;
		this.phoneNumber =phoneNumber;
		this.mode =mode;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getMode() {
		return mode;
	}
	public void setMode(String mode) {
		this.mode = mode;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	

}
