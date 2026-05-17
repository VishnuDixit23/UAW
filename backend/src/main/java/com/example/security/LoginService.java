package com.example.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.utils.JwtUtils;

@Service
public class LoginService {

	@Autowired AuthenticationManager authenticationManager;
    @Autowired JwtUtils jwtUtils;
	
	public ResponseCookie getLoginCookies(String phoneNumber,String password) {
		
		Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(phoneNumber, password));

	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

	        // Cookie generate karo
	        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

	        return jwtCookie;
	}
	
}
