package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.AbilityData;

public interface AbilityService {
    AbilityData createAbility(Long userId, String name, Integer stength);
    List<AbilityData> getUserAbilities(Long userId);
    AbilityData editAbility(Long id, String name, Integer strength);
    HttpStatusCode deleteAbility(Long id);
}
