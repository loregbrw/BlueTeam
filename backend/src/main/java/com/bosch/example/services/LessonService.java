package com.bosch.example.services;

import java.util.Date;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.Enum.LessonShiftEnum;
import com.bosch.example.dto.dtoRequest.LessonRequest;
import com.bosch.example.model.LessonData;
import com.bosch.example.model.SubjectClassData;

public interface LessonService {
    LessonData createLesson(LessonRequest lesson);
    List<LessonData> getLessonByTitle(String title);
    List<LessonData> getLessonByClass(Long classId);
    LessonData updateLesson(Long lessonId, LessonRequest lesson);
    HttpStatusCode deleteLesson(Long id);
}
