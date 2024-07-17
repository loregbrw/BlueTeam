package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.SubjectRequest;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.ClassData;
import com.bosch.example.model.CourseData;
import com.bosch.example.model.CourseSubjectData;
import com.bosch.example.model.SubjectData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.CourseJpaRepository;
import com.bosch.example.repositories.CourseSubjectJpaRepository;
import com.bosch.example.repositories.SubjectClassJpaRepository;
import com.bosch.example.repositories.SubjectJpaRepository;
import com.bosch.example.services.SubjectService;

public class DefaultSubjectService implements SubjectService {

    @Autowired 
    SubjectJpaRepository repoSubject;

    @Autowired 
    CourseSubjectJpaRepository repoSubjectCourse;

    @Autowired 
    CourseJpaRepository repoCourse;
    
    @Override
    public SubjectData createSubject(SubjectRequest subject) {
        try {

            SubjectData newSubject = new SubjectData(subject.name(), subject.plannedDuration());
            repoSubject.save(newSubject);

            return newSubject;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<SubjectData> getSubjectByName(String name) {
        try {
            return repoSubject.findByNameContaining(name);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public List<SubjectData> getAllSubjects() {
        try {
            return repoSubject.findAll();
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public SubjectData updateSubject(Long id, SubjectRequest subject) {
        SubjectData subjectSearch = repoSubject.findById(id).get();

        if (subjectSearch == null) {
            throw new NotFoundException();
        }

        try {
            subjectSearch.setName(subject.name());
            subjectSearch.setExpectedDuration(subject.plannedDuration());
            
            repoSubject.save(subjectSearch);

            return subjectSearch;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public HttpStatus deleteSubject(Long id) {
        try {
            SubjectData subjectSearch = repoSubject.findById(id).get();

            repoSubject.delete(subjectSearch);

            return HttpStatus.OK;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }

    @Override
    public List<SubjectData> getSubjectByCourseSubject(Long courseSubjectId) {
        try {
            CourseData courseDataSearch = repoCourse.findById(courseSubjectId).get();
            List<CourseSubjectData> courseSubjects = repoSubjectCourse.findByCourseId(courseDataSearch);
            List<SubjectData> subjects = new ArrayList<>();

            for (CourseSubjectData courseSubject : courseSubjects) {
                subjects.add(courseSubject.getSubjectId());
            }

            return subjects;

        } catch (Exception e) {
            throw new NotFoundException();
        }
    } 
}
