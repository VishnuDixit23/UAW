package com.example.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.example.Dtos.ApiResponse;
import com.example.Dtos.ErrorResponse;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 1. Handle Specific Exception (e.g. User Not Found - 404)
    

    // 2. Handle 404 for Wrong URLs (Need property: add-mappings=false)
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> handleNoHandlerFound(NoHandlerFoundException ex, WebRequest request) {
    	logger.error("Error occurred at: handleNoHandlerFound :", ex);
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
    	ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "URL Not Found",
                "The page or API you are looking for does not exist",
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

   

    // 4. Handle ALL OTHER Errors (Internal Server Error - 500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(Exception ex, WebRequest request) {
    	logger.error("Error occurred at: handleGlobalException :", ex);
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
    	ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Server Error",
                "Something went wrong on our side. Please try again later.", // Security: Don't show raw stacktrace to user
                request.getDescription(false)
        );
        // Yahan par aap log.error(ex.getMessage(), ex) zaroor karna taaki CloudWatch mein stacktrace dikhe
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
 // --- 4xx ERRORS ---

    // 400 - Bad Request (Validation fails, illegal arguments)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(IllegalArgumentException ex, WebRequest request) {
    	logger.error("Error occurred at: handleBadRequest :", ex);
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
    	return buildErrorResponse(HttpStatus.BAD_REQUEST, ex.getMessage(), request);
    }

    // 401 - Unauthorized (Token invalid or missing)
    // Note: Security filter errors handle karne ke liye entry point chahiye hota hai, 
    // par manually throw karne par ye kaam karega.
    @ExceptionHandler(org.springframework.security.core.AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorized(Exception ex, WebRequest request) {
    	logger.error("Error occurred at: handleUnauthorized :", ex);
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
    	return buildErrorResponse(HttpStatus.UNAUTHORIZED, "Authentication failed: Invalid credentials", request);
    }

    // 403 - Forbidden (Logged in but no permission)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(AccessDeniedException ex, WebRequest request) {
    	logger.error("Error occurred at: handleAccessDenied :", ex);
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
    	return buildErrorResponse(HttpStatus.FORBIDDEN, "Access Denied: You don't have permission", request);
    }

    // 404 - Not Found
    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, WebRequest request) {
    	logger.error("Error occurred at: handleNotFound :", ex);
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
    	return buildErrorResponse(HttpStatus.NOT_FOUND, ex.getMessage(), request);
    }

    // --- 5xx ERRORS ---

    // 502, 503, 504 - Gateway & Service Errors
    // Jab aap kisi external service (like Twilio ya Payment Gateway) ko call karte ho aur wo fail ho jaye
    @ExceptionHandler({HttpServerErrorException.BadGateway.class, 
                       HttpServerErrorException.ServiceUnavailable.class,
                       HttpServerErrorException.GatewayTimeout.class})
    public ResponseEntity<ErrorResponse> handleGatewayErrors(Exception ex, WebRequest request) {
    	
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
        
        logger.error("Error occurred at: handleGatewayErrors :", ex);
    	return buildErrorResponse(HttpStatus.BAD_GATEWAY, "External service is currently unavailable. Please try again.", request);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> UserNotFoundException(UserNotFoundException ex,WebRequest request) {
        // 409 Conflict ya 400 Bad Request use karna sahi rehta hai
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
        
        logger.error("Error occurred at: handleGatewayErrors :", ex);
        
        ApiResponse response = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND); 
    }
    
    // OtpNotSentException
    @ExceptionHandler(OtpNotSentException.class)
    public ResponseEntity<ApiResponse> OtpNotSentException(OtpNotSentException ex,WebRequest request) {
        // 409 Conflict ya 400 Bad Request use karna sahi rehta hai
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
        
        logger.error("Error occurred at: OtpNotSentException :", ex);
        
        ApiResponse response = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.SERVICE_UNAVAILABLE); 
    }
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiResponse> UserAlreadyExistsException(UserAlreadyExistsException ex,WebRequest request) {
        // 409 Conflict ya 400 Bad Request use karna sahi rehta hai
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
        
        logger.error("Error occurred at: handleGatewayErrors :", ex);
        
        ApiResponse response = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.CONFLICT); 
    }
    
    //DonationCountExceedException
    
    @ExceptionHandler(DonationCountExceedException.class)
    public ResponseEntity<ApiResponse> DonationCountExceedException(DonationCountExceedException ex,WebRequest request) {
        // 409 Conflict ya 400 Bad Request use karna sahi rehta hai
    	// Ye line aapko batayegi ki kaunse API path par error aayi
        logger.error("Error at URL: {}", request.getDescription(false)); 
        
        // Ye line exact exception ka naam print karegi
        logger.error("Exception Type: {}", ex.getClass().getName());
        
        // Ye line message dikhayegi
        logger.error("Error Message: {}", ex.getMessage());
        
        logger.error("Error occurred at: handleGatewayErrors :", ex);
        
        ApiResponse response = new ApiResponse(false, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.TOO_MANY_REQUESTS); 
    }

    // Helper method to keep code DRY (Don't Repeat Yourself)
    private ResponseEntity<ErrorResponse> buildErrorResponse(HttpStatus status, String message, WebRequest request) {
        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                status.value(),
                status.getReasonPhrase(),
                message,
                request.getDescription(false)
        );
        return new ResponseEntity<>(error, status);
    }
}
