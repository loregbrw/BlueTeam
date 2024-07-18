package com.bosch.example.services;

public interface CryptographyService {
    String hashPassword(String password);
    Boolean verifyPassword(String password, String hashedPassword);
    Boolean isStrongPassword(String password);
} 