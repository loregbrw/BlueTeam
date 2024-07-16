package com.bosch.example.dto.dtoRequest;

import com.bosch.example.Enum.HabilityStrenghtEnum;

public record AbilityRequest(
    Long userId,
    String name,
    HabilityStrenghtEnum strenght 
) { }
