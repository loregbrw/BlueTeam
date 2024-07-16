package com.bosch.example.dto.dtoRequest;

import java.util.Date;

public record ClassRequest(
    Long courseId, 
    Long instructorId, 
    String name, 
    Long duration, 
    Date initialDate
) { }
