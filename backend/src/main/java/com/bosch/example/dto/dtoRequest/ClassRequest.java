package com.bosch.example.dto.dtoRequest;

import java.time.LocalDate;

public record ClassRequest(
    Long courseId, 
    String name, 
    Long duration, 
    LocalDate initialDate
) { }
