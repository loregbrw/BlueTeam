package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.AbilityRequest;
import com.bosch.example.model.AbilityData;

public interface AbilityService {
    AbilityData createAbility(AbilityRequest ability);
    List<AbilityData> getUserAbilities(Long userId);
    AbilityData updateAbility(Long id, AbilityRequest ability);
    HttpStatus deleteAbility(Long id);
}
