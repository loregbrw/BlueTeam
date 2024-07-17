package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.SubjectClassRequest;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.AbilityData;
import com.bosch.example.model.ClassData;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.model.SubjectData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.AbilityJpaRepository;
import com.bosch.example.repositories.ClassJpaRepository;
import com.bosch.example.repositories.SubjectClassJpaRepository;
import com.bosch.example.repositories.SubjectJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.SubjectClassService;

public class DefaultSubjectClassService implements SubjectClassService {

    @Autowired
    SubjectClassJpaRepository repoSubjectClass;

    @Autowired
    ClassJpaRepository repoClass;

    @Autowired
    SubjectJpaRepository repoSubject;

    @Override
    public SubjectClassData createSubjectClass(SubjectClassRequest subjectClass) {
        try {
            ClassData classData = repoClass.findById(subjectClass.classId()).get();
            SubjectData subjectData = repoSubject.findById(subjectClass.subjectId()).get();

            SubjectClassData newSubjectClass = new SubjectClassData(classData, subjectData, subjectClass.duration());
            repoSubjectClass.save(newSubjectClass);

            return newSubjectClass;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<SubjectClassData> getSubjectClassByClass(Long classId) {
        try {
            ClassData classData = repoClass.findById(classId).get();
            List<SubjectClassData> subjectsClass = repoSubjectClass.findByClassId(classData);

            return subjectsClass;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }

    @Override
    public SubjectClassData updateSubjectClass(Long id, Long duration) {
        SubjectClassData subjectClassSearch = repoSubjectClass.findById(id).get();

        if (subjectClassSearch == null) {
            throw new NotFoundException();
        }

        try {
            subjectClassSearch.setDuration(duration);

            repoSubjectClass.save(subjectClassSearch);

            return subjectClassSearch;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public HttpStatus deleteSubjectClass(Long id) {
        try {
            SubjectClassData subjectClassSearch = repoSubjectClass.findById(id).get();
            repoSubjectClass.delete(subjectClassSearch);

            return HttpStatus.OK;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }
    
}
