package com.bosch.example.services;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.bosch.example.dto.AuthTokenDto;

public interface AuthService {
    public AuthTokenDto login(Long edv, String password);
    public DecodedJWT decode(String token);
}
