package com.example.user.services;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Dtos.User;
import com.example.exceptions.OtpNotSentException;
import com.example.exceptions.UserAlreadyExistsException;
import com.example.exceptions.UserNotFoundException;
import com.example.services.EmailService;
import com.example.services.SmsService;
import com.example.user.repository.UserRepository;
import com.example.utils.JwtUtils;



@Service
public class UserRegistrationService {
	
	Logger logger = org.slf4j.LoggerFactory.getLogger(UserRegistrationService.class);
	
	@Autowired
    private UserRepository userRepository;
	
	@Autowired
	private EmailService emailService;
	
	@Autowired
	private SmsService smsService;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public com.example.models.User registerUser(User user) {
		if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
	        throw new UserAlreadyExistsException("Phone number already taken!");
	    }
		com.example.models.User userEntity = new com.example.models.User();
	    BeanUtils.copyProperties(user, userEntity);
	    userEntity.setPassword(passwordEncoder.encode(user.getPhoneNumber()));
	    if(userEntity.getRole()==null)
	    	userEntity.setRole("USER");
		return userRepository.save(userEntity);
	}
	
	public String generateOtp(String phoneNumber) {
		int otpNo = generateSecureOtp();
		String otp=String.valueOf(otpNo);
	    boolean isOtpSent = smsService.sendOTP(phoneNumber, otp);
	    if (!isOtpSent) {
	        throw new OtpNotSentException("SMS provider service is down. Please try again later.");
	    }
		return userRepository.findByPhoneNumber(phoneNumber)
	    .map(user -> {
	        this.sendMailWithOtp(user.getEmail(), otp, phoneNumber);
	        user.setOtp(String.valueOf(otp)); 
	        user.setOtpExpiryTime(LocalDateTime.now().plusMinutes(5));
	        userRepository.save(user);
	        return "OTP generated and sent successfully!";
	    }).orElseThrow(() -> new UserNotFoundException("User not found Please register first!"));
	}
	
	
	public User  verifyOtp(String phoneNumber, String otp) {
		return userRepository.findByPhoneNumber(phoneNumber).filter(userEntity -> otp.equals(userEntity.getOtp())
				&& userEntity.getOtpExpiryTime().isAfter(LocalDateTime.now())).map(userEntity -> {
					User userDto = new User();
					BeanUtils.copyProperties(userEntity, userDto);
					userDto.setPassword(null);
					// Keep role so front-end can detect ADMIN
					return userDto;
				}).orElse(null);
			    
	}
	
	private void sendMailWithOtp(String email, String otp,String phoneNumber) {
		try {
			if(!StringUtils.isEmpty(email)) {
				emailService.sendEmail(email, "Animal fare Donation Otp", otp);
			}		
		}catch(Exception e) {
			logger.error("OTP email send karne mein error: {}, {} ,{} ,{}" , e.getMessage(),email,otp,phoneNumber);
		}
	}

	public int generateSecureOtp() {
	    SecureRandom sr = new SecureRandom();
	    return 100000 + sr.nextInt(900000);
	}
	public String generateCompactTxnId() {
	    // 1. Current Date and Time (Seconds tak accuracy)
	    String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss"));
	    
	    // 2. 3-digit Secure Random (Safety for concurrent requests)
	    SecureRandom sr = new SecureRandom();
	    int randomPart = 100 + sr.nextInt(900); 
	    
	    // Total Length: 1 (T) + 12 (Date) + 3 (Random) = 16 Characters
	    return "T" + timestamp + randomPart;
	}
}
