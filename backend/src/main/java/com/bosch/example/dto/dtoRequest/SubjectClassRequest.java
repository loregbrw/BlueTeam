package com.bosch.example.dto.dtoRequest;

public record SubjectClassRequest(
    Long subjectId, 
    Long classId, 
    Long duration
) { }