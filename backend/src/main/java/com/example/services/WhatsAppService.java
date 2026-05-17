package com.example.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WhatsAppService {
	
	Logger logger = org.slf4j.LoggerFactory.getLogger(WhatsAppService.class);

    @Value("${meta.whatsapp.phone-id}")
    private String phoneId;

    @Value("${meta.whatsapp.token}")
    private String accessToken;
    
    
    @Value("${meta.whatsapp.url}")
    private String watsappUrl;

    @Autowired
    private  RestTemplate restTemplate;

  
    public void sendPdfReceipt(String mobile, String donorName, String amount, String pdfUrl) {
        String url = watsappUrl + phoneId + "/messages";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // Main Payload
        Map<String, Object> payload = new HashMap<>();
        payload.put("messaging_product", "whatsapp");
        payload.put("to", mobile.startsWith("91") ? mobile : "91" + mobile);
        payload.put("type", "template");

        // Template Object
        Map<String, Object> template = new HashMap<>();
        template.put("name", "donation_receipt_80g");
        template.put("language", Map.of("code", "en")); // Dashboard ke hisab se 'en' check karo

        List<Map<String, Object>> components = new ArrayList<>();

        // --- HEADER (Document) ---
        Map<String, Object> header = new HashMap<>();
        header.put("type", "header");
        
        Map<String, Object> docParam = new HashMap<>();
        docParam.put("type", "document");
        docParam.put("document", Map.of(
            "link", pdfUrl,
            "filename", "Donation_Receipt.pdf"
        ));
        
        header.put("parameters", List.of(docParam));
        components.add(header);

        // --- BODY (Variables) ---
        Map<String, Object> body = new HashMap<>();
        body.put("type", "body");

        // Important: Meta expects these in the exact order {{1}}, {{2}}
        List<Map<String, Object>> bodyParams = new ArrayList<>();
     // Variable: {{donor_name}}
        Map<String, Object> param1 = new HashMap<>();
        param1.put("type", "text");
        param1.put("parameter_name", "donor_name"); // 👈 Ye dashboard se match hona chahiye
        param1.put("text", donorName);
        bodyParams.add(param1);

        // Variable: {{amount}}
        Map<String, Object> param2 = new HashMap<>();
        param2.put("type", "text");
        param2.put("parameter_name", "amount"); // 👈 Ye dashboard se match hona chahiye
        param2.put("text", amount);
        bodyParams.add(param2);
        body.put("parameters", bodyParams);
        components.add(body);

        template.put("components", components);
        payload.put("template", template);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            logger.info("WhatsApp Response: {}", response.getBody());
        } catch (Exception e) {
            // Bhai, pura error body print karo debug karne ke liye
            logger.error("Full Error: {}", e.getMessage());
        }
    }

    
    public void sendOtp(String mobile, String otpCode) {
        String url = watsappUrl + phoneId + "/messages";

        // Standard Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(accessToken);

        // Payload Setup
        Map<String, Object> payload = new HashMap<>();
        payload.put("messaging_product", "whatsapp");
        payload.put("to", mobile.startsWith("91") ? mobile : "91" + mobile);
        payload.put("type", "template");

        Map<String, Object> template = new HashMap<>();
        template.put("name", "otp_verification"); // Dashboard wala naam
        template.put("language", Map.of("code", "en"));

        // OTP Parameters
        List<Map<String, Object>> components = new ArrayList<>();
        components.add(Map.of(
            "type", "body",
            "parameters", List.of(
                Map.of("type", "text", "text", otpCode) // {{1}} variable
            )
        ));
        
        // Copy Code Button Logic (Agar dashboard mein button add kiya hai)
        components.add(Map.of(
            "type", "button",
            "sub_type", "url",
            "index", "0",
            "parameters", List.of(Map.of("type", "text", "text", otpCode))
        ));

        template.put("components", components);
        payload.put("template", template);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);
        restTemplate.postForEntity(url, entity, String.class);
    }
   
}
