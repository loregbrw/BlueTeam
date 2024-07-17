package com.bosch.example.dto.dtoRequest;

public record UserSkillRequest(
    Long userId, 
    Long skillsId, 
    Float value
) { }
