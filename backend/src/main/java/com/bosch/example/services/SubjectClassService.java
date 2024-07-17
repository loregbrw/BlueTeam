package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.SubjectClassRequest;
import com.bosch.example.model.SubjectClassData;

public interface SubjectClassService {
    SubjectClassData createSubjectClass(SubjectClassRequest subjectClass); 
    List<SubjectClassData> getSubjectClassByClass(Long classId);
    SubjectClassData updateSubjectClass(Long id, Long duration);
    HttpStatus deleteSubjectClass(Long id);
}
