package com.bosch.example.dto.dtoRequest;

public record ReportRequest(
    Long userId, 
    Long authorId,
    String description
) { }
