package com.bosch.example.services;

import java.util.Date;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.Enum.LessonShiftEnum;
import com.bosch.example.model.LessonData;
import com.bosch.example.model.SubjectClassData;

public interface LessonService {
    LessonData createLesson(SubjectClassData subjectClassId, String title, String description, LessonShiftEnum shift, Date date);
    List<LessonData> getByTitle(String title);
    List<LessonData> getLessonClass(Long id);
    LessonData updateLesson(SubjectClassData subjectClassId, String title, String description, LessonShiftEnum shift, Date date);
    HttpStatusCode deleteLesson(Long id);
}
