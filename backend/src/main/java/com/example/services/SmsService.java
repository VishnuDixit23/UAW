package com.example.services;

import org.slf4j.Logger;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

@Service
public class SmsService {
	
	Logger logger = org.slf4j.LoggerFactory.getLogger(SmsService.class);

	// Aapke credentials jo curl se mile
    public static final String ACCOUNT_SID = "";
    public static final String AUTH_TOKEN = "";
    public static final String MESSAGING_SERVICE_SID = "";

    public boolean sendOTP(String mobileNumber, String otp) {
       
    	try {
    		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    		String formattedNumber = mobileNumber.startsWith("+") ? mobileNumber : "+91" + mobileNumber;
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber(formattedNumber), // Jisko bhejna hai
                    MESSAGING_SERVICE_SID,                         // Aapka Service SID
                    "Your RoomRent OTP is: " + otp                 // Message body
            ).create();
            return message.getSid() != null;
    	}catch (Exception e) {
    		logger.error("Twilio SMS failed for {}: {}", mobileNumber, e.getMessage());
            return false;
		}
    	
    }
    
}
