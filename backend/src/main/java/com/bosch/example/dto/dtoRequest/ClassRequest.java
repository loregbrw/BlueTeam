package com.bosch.example.dto.dtoRequest;

import java.time.LocalDate;
import java.util.Date;

public record ClassRequest(
    Long courseId, 
    String name, 
    Long duration, 
    LocalDate initialDate
) { }
