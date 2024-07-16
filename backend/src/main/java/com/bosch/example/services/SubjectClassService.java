package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.SubjectClassData;

public interface SubjectClassService {
    SubjectClassData create(Long courseId, Long classId, String name, Long plannedDuration, Long Duration); // creaate DTO subjectData + subjectClass
    List<SubjectClassData> getSubjectClassToClass(Long classId);
    SubjectClassData update(Long duration);
    HttpStatusCode delete(Long id);
}
