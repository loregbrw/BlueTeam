package com.bosch.example.services;

import com.bosch.example.dto.AuthTokenDto;

public interface AuthService {
    public AuthTokenDto login(String username, String password);
}
