package com.example.user.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.example.models.User;

@Repository
public interface UserRepository extends org.springframework.data.jpa.repository.JpaRepository<User, Long> {

	
	// 🌟 Custom Method: Spring Security ke login ke liye zaroori hai
    Optional<User> findByFirstname(String username);
    
    // Agar phone number se bhi login karwana ho
    Optional<User> findByPhoneNumber(String phoneNumber);
    
    User save(User user);
	
    Optional<User> findByPhoneNumberAndFirstname(String phoneNumber,String username);
    
    boolean existsByPhoneNumber(String phoneNumber);

}
