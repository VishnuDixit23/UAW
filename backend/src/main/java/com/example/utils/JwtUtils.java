package com.example.utils;

import java.util.Date;

import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.example.Dtos.LoginRequest;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class JwtUtils {
	
	private String jwtSecret = "pavanKumarSeniorEngineerProjectRoomRentPurchase2026SecureKey";
    private int jwtExpirationMs = 24*60*1000; // 24 hours
    private String cookieName = "pavan_auth_token";

    // Cookie generate karna
    public ResponseCookie generateJwtCookie(UserDetails userDetails) {
     
    	
    	
    	String jwt = Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()), SignatureAlgorithm.HS256)
                .compact();

        return ResponseCookie.from(cookieName, jwt)
                .path("/")  // Cookie har endpoint par accessible hoga
                .maxAge(60)
                .httpOnly(true)    // JS access block (XSS protection)
                .secure(false)     // Localhost par false, Production (HTTPS) par true karna
                .sameSite("Lax")   // CSRF safety
                .build();
    }

  //  HttpOnly Cookies: Aapne jo JWT with Cookies use kiya hai, usme cookie ko HttpOnly flag ke sath set karo. Isse JavaScript us cookie ko read hi nahi kar payegi. XSS fail!
    
    // Cookie se token nikaalna
    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, cookieName);
        return (cookie != null) ? cookie.getValue() : null;
    }

    // Token validate karna
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes())).build().parse(authToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(jwtSecret.getBytes())).build()
                .parseClaimsJws(token).getBody().getSubject();
    }
    
   
}

