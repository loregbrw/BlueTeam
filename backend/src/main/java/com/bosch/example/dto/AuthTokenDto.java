package com.bosch.example.dto;

import com.bosch.example.Enum.UserRoleEnum;

public record AuthTokenDto(
    UserRoleEnum role,
    String token,
    Long id
) {}
