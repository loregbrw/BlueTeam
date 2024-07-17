package com.bosch.example.services;

import org.springframework.http.ResponseEntity;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.bosch.example.dto.AuthTokenDto;

public interface AuthService {
    public ResponseEntity<AuthTokenDto> login(Long edv, String password);
    public DecodedJWT decode(String token);
}
