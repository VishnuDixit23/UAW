package com.example.controllers;

import java.io.IOException;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Dtos.ApiResponse;
import com.example.Dtos.DonationDetailsDTO;
import com.example.Dtos.DonationRequest;
import com.example.Dtos.OtpRequest;
import com.example.Dtos.User;
import com.example.Dtos.VerifyOtpRequest;
import com.example.dao.DonationServiceDao;
import com.example.models.Donation;
import com.example.security.LoginService;
import com.example.services.DonationService;
import com.example.services.EasebuzzService;
import com.example.user.repository.DonationRepository;
import com.example.user.services.UserRegistrationService;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"https://unitedforanimalwelfare.com", "https://unitedforanimalwelfare.org", "https://unitedforanimalwelfare.in","http://localhost:5173"})
public class UserRegisterController {
	
    private static final Logger logger = LoggerFactory.getLogger(UserRegisterController.class);
	
    @Autowired
	private UserRegistrationService userRegistrationService;
	
	 @Autowired
	 private EasebuzzService easebuzzService;
	 
	 @Value("${easebuzz.redirect.domain.url}")
	private String applicationDomainUrl;
	 
	 @Autowired
	 private DonationService donationService;
	 
	 @Autowired
	 private DonationServiceDao donationServiceDao;
	 
	 @Autowired
	 private LoginService loginService;
	
	@PostMapping("/registerUser")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
		com.example.models.User userSaved = userRegistrationService.registerUser(user);
		if (userSaved == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(false, "User registration failed!"));
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(true, "User registered successfully!", userSaved.getPhoneNumber()));
	}
	
	
   @PostMapping("/generateOtp")
   public ResponseEntity<?> generateOtp(@Valid @RequestBody OtpRequest request) {
	   String mobileNumber = request.getMobileNumber();
	   String message = userRegistrationService.generateOtp(mobileNumber);
	   return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(true, message, mobileNumber));
   }
   
   @PostMapping("/verifyOtp")
   public ResponseEntity<?> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
	   User user = userRegistrationService.verifyOtp(request.getMobileNumber(), request.getOtp());
	   if (user == null) {
		   return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Invalid or expired OTP!"));
	   } else {
		   ResponseCookie jwtCookie = loginService.getLoginCookies(user.getPhoneNumber(), user.getPhoneNumber());
		   return ResponseEntity.status(HttpStatus.OK) 
				   .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
				   .body(new ApiResponse(true, "OTP verified successfully!", request.getMobileNumber(), user));
	   }
   }
   
   @GetMapping("/hello")
   public String getHello() {
	   return "hello pavan";
   }
   
 
   
   @PostMapping("/payment/success")
   public void paymentLinkSuccess(@RequestParam Map<String, String> params, HttpServletResponse response) throws IOException {
	   params.forEach((key, value) -> {
		   logger.info("key {} : value {}", key, value);
	   });
	   donationService.updateTransactionStatus(params, response);
   }
   
   @PostMapping("/payment/failure")
   public void paymentLinkFailure(@RequestParam Map<String, String> params, HttpServletResponse response) throws IOException {
	   params.forEach((key, value) -> {
		   logger.info("key {} , value {}", key, value);
	   });
	   donationService.updateTransactionFailStatus(params, response);
   }
    
}
