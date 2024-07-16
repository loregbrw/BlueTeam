package com.bosch.example.dto.dtoRequest;

import java.util.List;

import com.bosch.example.model.UserSkillsData;

public record UserSkillRequest(
    Long userId, 
    Long skillsId, 
    Float value
) { }
