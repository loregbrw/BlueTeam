package com.bosch.example.services;

import com.bosch.example.dto.dtoRequest.CourseSubjectRequest;
import com.bosch.example.model.CourseSubjectData;

public interface CourseSubjectService {
    CourseSubjectData createCourseSubject(CourseSubjectRequest courseSubjectRequest);
} 
