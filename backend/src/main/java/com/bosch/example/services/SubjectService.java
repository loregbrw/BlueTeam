package com.bosch.example.services;

import java.util.List;

import javax.security.auth.Subject;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.SubjectRequest;
import com.bosch.example.model.SubjectData;

public interface SubjectService {
    SubjectData createSubject(SubjectRequest subject);
    List<SubjectData> getSubjectByName(String name);
    List<SubjectData> getAllSubjects();
    SubjectData updateSubject(Long id, SubjectRequest subject);
    HttpStatusCode deleteSubject(Long id);
    List<SubjectData> getSubjectByCourseSubject(Long courseSubjectId);
}
