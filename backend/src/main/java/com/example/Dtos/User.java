package com.example.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class User {
	
	@NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9_]{3,20}$", message = "Username must be 3-20 characters long and can only contain letters, numbers, and underscores")
    private String firstname;
	
    private String lastname;
    
    private String password; // BCrypt hashed
    
    private String role="USER"; // e.g., "USER", "ADMIN"
    
    @NotBlank
	@Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be exactly 10 digits")
    private String phoneNumber;
    
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$", message = "Invalid email format")
    private String email;
    
   // @NotBlank(message = "Address line 1 is required")
    @Size(max = 255, message = "Address is too long")
    private String address1;

    @Size(max = 255, message = "Address line 2 is too long")
    private String address2;
    
 //   @NotBlank(message = "Pincode is required")
    @Pattern(regexp = "^[0-9]{6,10}$", message = "Pincode must be between 6 to 10 digits")
    private String pincode;
    
 //   @NotBlank(message = "City is required")
    @Size(max = 100)
    private String city;

 //   @NotBlank(message = "State is required")
    @Size(max = 100)
    private String state;
    
    public User() {}	
    
    public User(String firstname, String phoneNumber) {
        this.firstname = firstname;
        this.phoneNumber = phoneNumber;
    }
    
    public User(String firstname, String password, String role, String phoneNumber) {
        this.firstname = firstname;
        this.password = password;
        this.role = role;	
        this.phoneNumber = phoneNumber;
    }
    
    public User(String firstname, String password,String phoneNumber) {
        this.firstname = firstname;
        this.password = password;	
        this.phoneNumber = phoneNumber;
    }
    
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	
	
	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public String getAddress1() {
		return address1;
	}

	public void setAddress1(String address1) {
		this.address1 = address1;
	}

	public String getAddress2() {
		return address2;
	}

	public void setAddress2(String address2) {
		this.address2 = address2;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}
	
    
    
}
