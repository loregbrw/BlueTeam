package com.bosch.example.dto.dtoRequest;

import java.util.Date;

import com.bosch.example.Enum.LessonShiftEnum;
import com.bosch.example.model.SubjectClassData;

public record LessonRequest(
    Long subjectClassId, 
    String title, 
    String description, 
    LessonShiftEnum shift, 
    Date date
) { }
