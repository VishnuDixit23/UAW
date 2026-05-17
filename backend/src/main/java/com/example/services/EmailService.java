package com.example.services;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.InputStreamSource;
import java.net.URL;




@Service
public class EmailService {
			
	Logger logger = org.slf4j.LoggerFactory.getLogger(EmailService.class);
	
	@Value("${spring.mail.username}")
	private String senderMailId;
	

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(senderMailId);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
    
    public String sendEmailForDonationLink(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(senderMailId);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true); 
            mailSender.send(message);
            logger.info("HTML Email sent successfully!");
            return "mailSent";
        } catch (MessagingException e) {
        	logger.info("Some issue while sending mail");
        	return "mailNotSent";
        }
    } 

    public String sendEmailWithAttachment(String to, String subject, String body, String cloudinaryUrl) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom(senderMailId);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);
            URL url = new URL(cloudinaryUrl);
            InputStreamSource attachment = () -> url.openStream();
            helper.addAttachment("Donation_Receipt_80G.pdf", attachment);
            mailSender.send(message);
            logger.info("Email with PDF attachment sent successfully to {}", to);
            return "mailSent";
        } catch (Exception e) {
            logger.error("Error while sending email with attachment: {}", e.getMessage());
            return "mailNotSent";
        }
    }
    
}
