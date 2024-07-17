package com.bosch.example.dto.dtoRequest;

import java.util.Date;

public record ClassRequest(
    Long courseId, 
    String name, 
    Long duration, 
    Date initialDate
) { }
