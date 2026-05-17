package com.example.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.user.repository.UserRepository;
import com.example.utils.JwtUtils;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

   // @Autowired UserRepository userRepository;
	
	@Autowired JwtUtils jwtUtil;
	
	@Autowired
    private UserRepository userRepository;
	

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
    	
    	com.example.models.User user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new UsernameNotFoundException("in loadUserByUsername User not found with name: " + phoneNumber));
    	
        // Spring Security ke built-in User object ka use kar rahe hain
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getPhoneNumber()) // Username ke roop mein firstname use kar rahe hain
            .password(user.getPassword()) // Mobile number ko password ke roop mein use kar rahe hain
            .authorities("USER") // Default role
            .build();
    }
       
}