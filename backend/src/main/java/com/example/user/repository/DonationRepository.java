package com.example.user.repository;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import com.example.Dtos.DonationDetailsDTO;
import com.example.models.Donation;


@Repository
@DynamicUpdate
public interface DonationRepository extends JpaRepository<Donation, Long> {
	
	// 24 ghante ka count check karne ke liye logic
    @Query("SELECT COUNT(d) FROM Donation d WHERE d.user.phoneNumber = :phone AND d.createdAt >= :time ")
    long countRecentDonations(@Param("phone") String phone, @Param("time") LocalDateTime time);
    
    Donation findByTransactionId(String transactionId);
    
    Donation save(Donation donation);
 
   
    @Query(value = "SELECT new com.example.Dtos.DonationDetailsDTO(u.firstname, u.email, u.phoneNumber, d.transactionId, d.amount, d.paymentMode, d.status, d.createdAt) " +
            "FROM Donation d JOIN d.user u " + 
            "WHERE u.phoneNumber = :phone",
            countQuery = "SELECT count(d) FROM Donation d JOIN d.user u WHERE u.phoneNumber = :phone")
     Page<DonationDetailsDTO> getDonationsByUser(@Param("phone") String phone, Pageable pageable);

     @Query(value = "SELECT new com.example.Dtos.DonationDetailsDTO(u.firstname, u.email, u.phoneNumber, d.transactionId, d.amount, d.paymentMode, d.status, d.createdAt) " +
            "FROM Donation d JOIN d.user u " +
            "WHERE d.paymentMode = :mode",
            countQuery = "SELECT count(d) FROM Donation d WHERE d.paymentMode = :mode")
     Page<DonationDetailsDTO> findDonationDetailsByPaymentMode(@Param("mode") String mode, Pageable pageable);

     @Query(value = "SELECT new com.example.Dtos.DonationDetailsDTO(u.firstname, u.email, u.phoneNumber, d.transactionId, d.amount, d.paymentMode, d.status, d.createdAt) " +
            "FROM Donation d JOIN d.user u",
            countQuery = "SELECT count(d) FROM Donation d")
     Page<DonationDetailsDTO> findDonationDetails(Pageable pageable);


      
}
