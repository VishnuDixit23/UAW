package com.example.Dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class OtpRequest {
    @NotBlank(message = "Mobile No cannot be blank")
    @Pattern(regexp = "^[0-9]{10}$", message = "Enter Valid 10 digits mobile no")
    private String mobileNumber;

    // Getters and Setters
    public String getMobileNumber() { return mobileNumber; }
    public void setMobileNumber(String mobileNumber) { this.mobileNumber = mobileNumber; }
}
