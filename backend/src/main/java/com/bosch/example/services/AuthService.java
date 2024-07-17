package com.bosch.example.services;

import org.springframework.http.ResponseEntity;

import com.auth0.jwt.interfaces.DecodedJWT;

public interface AuthService {
    public ResponseEntity<String> login(Long edv, String password);
    public DecodedJWT decode(String token);
}
