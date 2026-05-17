package com.example.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;
    

    public CloudinaryService(@Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {
    	
    	if(apiKey == null || apiKey.isEmpty()) {
            System.err.println("BHAI! API Key nahi mil rahi properties file se!");
       }
        // Cloudinary Dashboard se credentials yahan dalo
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
            "cloud_name", cloudName,
            "api_key", apiKey,
            "api_secret", apiSecret,
            "secure", true
        ));
    }

    public String uploadPdf(byte[] pdfBytes, String receiptId) {
        try {
            Map uploadResult = cloudinary.uploader().upload(pdfBytes, ObjectUtils.asMap(
                "public_id", "receipts/" + receiptId, // Folder structure ban jayega
                "resource_type", "auto",
                "access_mode", "public"  // PDF ke liye 'auto' ya 'raw' zaroori hai
            ));
            
            // Ye URL hum WhatsApp par bhejenge
            return (String) uploadResult.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Cloudinary upload failed: " + e.getMessage());
        }
    }
}
