package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.SubjectClassData;

public interface SubjectClassService {
    SubjectClassData createSubjectClass(Long courseId, Long classId, String name, Long plannedDuration, Long Duration); // creaate DTO subjectData + subjectClass
    List<SubjectClassData> getSubjectClassByClass(Long classId);
    SubjectClassData updateSubjectClass(Long id, Long duration);
    HttpStatusCode deleteSubjectClass(Long id);
}
