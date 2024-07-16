package com.bosch.example.dto.dtoRequest;

public record SkillsRequest(
    Long subjectClassId, 
    String name, 
    String description, 
    Integer weight
) { } 