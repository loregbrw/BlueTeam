package com.bosch.example.services;

public interface CryptographyService {
    String generateSalt();
    String hashPassword(String password, String salt);
    Boolean verifyPassword(String password, String hashedPassword);
    Boolean isStrongPassword(String password);
} 