package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import com.bosch.example.dto.dtoRequest.SubjectRequest;
import com.bosch.example.model.CourseSubjectData;
import com.bosch.example.model.SubjectData;

public interface SubjectService {
    SubjectData createSubject(SubjectRequest subject);
    List<SubjectData> getSubjectByName(String name);
    List<SubjectData> getAllSubjects();
    SubjectData updateSubject(Long id, SubjectRequest subject);
    HttpStatus deleteSubject(Long id);
    List<SubjectData> getSubjectByCourseSubject(Long courseSubjectId);
}
