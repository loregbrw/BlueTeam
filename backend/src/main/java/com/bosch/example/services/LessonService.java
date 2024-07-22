package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import com.bosch.example.dto.dtoRequest.LessonRequest;
import com.bosch.example.model.LessonData;

public interface LessonService {
    LessonData createLesson(LessonRequest lesson);
    LessonData getLessonById(Long id);
    List<LessonData> getLessonByClass(Long classId);
    LessonData updateLesson(Long lessonId, LessonRequest lesson);
    HttpStatus deleteLesson(Long id);
    List<LessonData> getLessonByUserId(Long id);
}
