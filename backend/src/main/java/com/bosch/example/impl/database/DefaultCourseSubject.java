package com.bosch.example.impl.database;

import java.security.InvalidParameterException;

import org.springframework.beans.factory.annotation.Autowired;

import com.bosch.example.dto.dtoRequest.CourseSubjectRequest;
import com.bosch.example.model.CourseData;
import com.bosch.example.model.CourseSubjectData;
import com.bosch.example.model.SubjectData;
import com.bosch.example.repositories.CourseJpaRepository;
import com.bosch.example.repositories.CourseSubjectJpaRepository;
import com.bosch.example.repositories.SubjectJpaRepository;
import com.bosch.example.services.CourseSubjectService;

public class DefaultCourseSubject implements CourseSubjectService {

    @Autowired
    CourseJpaRepository repoCourse;

    @Autowired 
    SubjectJpaRepository repoSubject;

    @Autowired
    CourseSubjectJpaRepository repoCourseSubject;

    @Override
    public CourseSubjectData createCourseSubject(CourseSubjectRequest courseSubjectRequest) {
        try {
            CourseData courseSearch = repoCourse.findById(courseSubjectRequest.courseId()).get();
            SubjectData subjectSearch = repoSubject.findById(courseSubjectRequest.subjectId()).get();
            CourseSubjectData newCourseSubject = new CourseSubjectData(courseSearch, subjectSearch);

            repoCourseSubject.save(newCourseSubject);
            return newCourseSubject;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }
}
