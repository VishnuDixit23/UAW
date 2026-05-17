//package com.example.controllers;
//
//import java.util.HashMap;
//import java.util.Map;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.example.models.Donation;
//import com.example.services.EasebuzzService;
//
//
//@RestController
//@RequestMapping("/api/payment/method2")
//@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
//public class EasebuzzController {
//
//	@Value("${easebuzz.key}")
//    private String merchantKey;
//	
//	
//    @Autowired
//    private EasebuzzService easebuzzService;
//
//    @PostMapping("/initiate")
//    public ResponseEntity<Map<String, String>> initiatePayment(@RequestBody Map<String, String> requestData) {
//        // txnid generate karo
//        String txnid = "TXN" + System.currentTimeMillis();
//        requestData.put("txnid", txnid);
//
//        // Hash generate karo
//        String hash = easebuzzService.generateRequestHash(requestData);
//
//        Map<String, String> response = new HashMap();
//        response.put("hash", hash);
//        response.put("txnid", txnid);
//        response.put("key", merchantKey);
//
//        return ResponseEntity.ok(response);
//    }
//    
//    
//    
//   
//    
//    
//}