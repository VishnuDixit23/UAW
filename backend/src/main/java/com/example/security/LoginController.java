//package com.example.security;
//
//import javax.security.sasl.AuthenticationException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.Dtos.LoginRequest;
//import com.example.utils.JwtUtils;
//
//import jakarta.validation.Valid;
//
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpStatus;
//
//@RestController
//@RequestMapping("/api/auth")
//public class LoginController {
//    @Autowired AuthenticationManager authenticationManager;
//    @Autowired JwtUtils jwtUtils;
//    @Autowired LoginService loginService;
//    
//
//    @PostMapping("/login")
//    public ResponseEntity<?> authenticateUser( @Valid @RequestBody LoginRequest loginRequest) {
//    	try {
//			// Authentication attempt
//    		ResponseCookie jwtCookie= loginService.getLoginCookies(loginRequest.getUsername(), loginRequest.getMobileNumber());
//    	        return ResponseEntity.ok()
//    	            .header(HttpHeaders.SET_COOKIE, jwtCookie.toString()) // Cookie browser ko bhejo
//    	            .body("Login Success!");
//		}catch (BadCredentialsException e) {
//		    // Ye tab chalta hai jab password match nahi hota
//		    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Wrong Password ");
//		} catch (UsernameNotFoundException e) {
//		    // Ye tab chalta hai jab user database mein nahi hota
//		    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: User not found!");
//		} catch (Exception e) {
//		    // Baaki kisi bhi tarah ki security exception ke liye
//		    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Authentication failed");
//		}
//        
//    }
//}
