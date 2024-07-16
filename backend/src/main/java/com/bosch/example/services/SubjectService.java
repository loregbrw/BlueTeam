package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.SubjectData;

public interface SubjectService {
    SubjectData PostSubject(Long id, String Name, Long ExpectedDuration);
    SubjectData GetSubject(String Name);
    List<SubjectData> GetAllSubjects();
    SubjectData PatchSubject(Long id, String Name, Long ExpectedDuration);
    HttpStatusCode DeleteSubject(Long id);
    List<SubjectData> GetSubjectSubjectCourse(Long id);
}
