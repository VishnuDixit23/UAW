package com.example.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.example.Dtos.EasebuzzResponse;

@Service
public class EasebuzzService {
    
    private static final Logger logger = LoggerFactory.getLogger(EasebuzzService.class);
    
    @Value("${easebuzz.key}")
    private String merchantKey;

    @Value("${easebuzz.salt}")
    private String merchantSalt;

    
    @Value("${easebuzz.initiate.url}")
    private String initiateUrl;
    
    @Value("${easebuzz.initiate.accesskeyUrl}")
    private String accessKeyUrl;
    
    
    @Value("${easebuzz.redirect.domain.url}")
    private String redirectUrl;

    
    private final RestTemplate restTemplate = new RestTemplate();

    public String generateEasyCollectHash(Map<String, String> params) {
        String name = params.getOrDefault("name", "");
        String email = params.getOrDefault("email", "");
        String phone = params.getOrDefault("phone", "");
        String amount = params.getOrDefault("amount", "");
        String merchantTxn = params.getOrDefault("merchant_txn", "");
        String message = params.getOrDefault("message", "");
        
        // Yahan sequence ka dhyan rakhna, total 12 pipes honge
        String hashString = String.format("%s|%s|%s|%s|%s|%s|%s|%s|%s|%s|%s|%s|%s",
                merchantKey, merchantTxn, name, email, phone, amount, 
                "", "", "", "", "", // udf1 to udf5 (khali)
                message,
                merchantSalt
        );
        return DigestUtils.sha512Hex(hashString);
    }

    

    public Map createEasyCollectLink(String name, String phone, String email, String amount, String txnId) {
        Map<String, Object> body = new HashMap<>();
        body.put("key", merchantKey);
        body.put("name", name);
        body.put("phone", phone);
        body.put("email", email);
        body.put("amount", amount);
        body.put("merchant_txn", txnId);
        body.put("message", "Donation for Animal Welfare");
        
        // Hash generate karne ke liye params (Strings only)
        Map<String, String> hashParams = new HashMap<>();
        hashParams.put("name", name);
        hashParams.put("email", email);
        hashParams.put("phone", phone);
        hashParams.put("amount", amount);
        hashParams.put("merchant_txn", txnId);
        hashParams.put("message", "Donation for Animal Welfare");
      //  body.put("webhook_url", redirectUrl+"/user/webhook");
        body.put("hash", generateEasyCollectHash(hashParams));
        body.put("surl", redirectUrl+"/user/payment/success");
        body.put("furl", redirectUrl+"/user/payment/failure");
        // Operations for SMS/Email
        List<Map<String, String>> operations = new ArrayList<>();
     // SMS ke liye
        Map<String, String> smsOp = new HashMap<>();
        smsOp.put("type", "sms");
        smsOp.put("template", "default"); // Ye "default" likhna zaroori hai
        operations.add(smsOp);

        // Email ke liye
        Map<String, String> emailOp = new HashMap<>();
        emailOp.put("type", "email");
        emailOp.put("template", "default"); // Yahan bhi "default"
        operations.add(emailOp);
        body.put("operation", operations);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        String url = "https://testdashboard.easebuzz.in/easycollect/v1/create";

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        
        if (response.getBody() != null && (Boolean) response.getBody().get("status")) {
            Map data = (Map) response.getBody().get("data");
           // return (String) data.get("payment_url"); // Direct link mil jayega!
            return data;
        }
        return new HashMap<>();
    }
    
   

    public Map<String, Object> checkTransactionStatus(String txnid) {
        // 1. Hash Sequence: key|txnid|salt
        String hashString = merchantKey + "|" + txnid + "|" + merchantSalt;
        String hash = DigestUtils.sha512Hex(hashString);

        // 2. Body taiyar karo (x-www-form-urlencoded)
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("key", merchantKey);
        map.add("txnid", txnid);
        map.add("hash", hash);

        // 3. Headers set karo
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);
        
        String url = "https://testdashboard.easebuzz.in/transaction/v2.1/retrieve";

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
            
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return (Map<String, Object>) response.getBody();
            }
        } catch (Exception e) {
            System.out.println("Error calling Easebuzz Retrieve API: " + e.getMessage());
        }
        return null;
    }
    
    
    public String initiatePayment(String name, String phone, String email, String amount, String txnId) {
        String firstname = name;
        String productInfo = "AnimalWelfareDonation";
        // Hash Calculation
        String hashSequence = String.join("|", 
            merchantKey, txnId, amount, productInfo, firstname, email, 
            "", "", "", "", "", "", "", "", "", "", merchantSalt // udf1-udf10 empty
        );
        String hash = DigestUtils.sha512Hex(hashSequence);
        // Form Data taiyar karo (x-www-form-urlencoded)
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("key", merchantKey.trim());
        map.add("txnid", txnId.trim());
        map.add("amount", amount.trim());
        map.add("productinfo", productInfo.trim());
        map.add("firstname", firstname.trim());
        map.add("phone", phone.trim());
        map.add("email", email.trim());
        map.add("surl", redirectUrl+"/user/payment/success");
        map.add("furl", redirectUrl+"/user/payment/failure");
        map.add("hash", hash);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

        try {
            ResponseEntity<EasebuzzResponse> response = restTemplate.postForEntity(initiateUrl, request, EasebuzzResponse.class);
            if (response.getBody() != null && response.getBody().getStatus() == 1) {
                // Final Payment URL generate karo
                return accessKeyUrl + response.getBody().getData();
            }
        } catch (Exception e) {
            throw new RuntimeException("Easebuzz Initiation Failed: " + e.getMessage());
        }
        return null;
    }
    
   

    public boolean verifyEasebuzzHash(Map<String, String> response) {
        String responseHash = response.get("hash");
        
        // Sequence: salt|status|udf10|udf9|...|txnid|key
        StringBuilder hashString = new StringBuilder();
        hashString.append(merchantSalt).append("|")
                  .append(response.getOrDefault("status", "")).append("|")
                  .append(response.getOrDefault("udf10", "")).append("|")
                  .append(response.getOrDefault("udf9", "")).append("|")
                  .append(response.getOrDefault("udf8", "")).append("|")
                  .append(response.getOrDefault("udf7", "")).append("|")
                  .append(response.getOrDefault("udf6", "")).append("|")
                  .append(response.getOrDefault("udf5", "")).append("|")
                  .append(response.getOrDefault("udf4", "")).append("|")
                  .append(response.getOrDefault("udf3", "")).append("|")
                  .append(response.getOrDefault("udf2", "")).append("|")
                  .append(response.getOrDefault("udf1", "")).append("|")
                  .append(response.getOrDefault("email", "")).append("|")
                  .append(response.getOrDefault("firstname", "")).append("|")
                  .append(response.getOrDefault("productinfo", "")).append("|")
                  .append(response.getOrDefault("amount", "")).append("|")
                  .append(response.getOrDefault("txnid", "")).append("|")
                  .append(response.getOrDefault("key", ""));

        String calculatedHash = DigestUtils.sha512Hex(hashString.toString());;
        
        return calculatedHash.equalsIgnoreCase(responseHash);
    }
    
    
}