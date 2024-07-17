package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.ClassRequest;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.AbilityData;
import com.bosch.example.model.ClassData;
import com.bosch.example.model.CourseData;
import com.bosch.example.model.LessonData;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.ClassJpaRepository;
import com.bosch.example.repositories.CourseJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.ClassService;

public class DefaultClassService implements ClassService {

    @Autowired
    ClassJpaRepository repoClass;

    @Autowired
    UserJpaRepository repoUser;

    @Autowired
    CourseJpaRepository repoCourse;

    @Override
    public ClassData createClass(ClassRequest classDto) {
        try {
            UserData user = repoUser.findById(classDto.instructorId()).get();
            CourseData course = repoCourse.findById(classDto.courseId()).get();
            Date dateSql = Date.valueOf((classDto.initialDate()).toString());

            ClassData newClass = new ClassData(course, user, classDto.name(), classDto.duration(), dateSql);
            repoClass.save(newClass);

            return newClass;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<ClassData> getAllClasses() {
        try {
            return repoClass.findAll();
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public ClassData getClassById(Long id) {
        try {
            return repoClass.findById(id).get();
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public List<ClassData> getClassByName(String name) {
        try {
            return repoClass.findByNameContaining(name);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public ClassData updateClass(Long classId, ClassRequest classDto) {
        ClassData classSearch = repoClass.findById(classId).get();

        if (classSearch == null) {
            throw new NotFoundException();
        }

        try {
            UserData user = repoUser.findById(classDto.instructorId()).get();
            CourseData course = repoCourse.findById(classDto.courseId()).get();
            Date dateSql = Date.valueOf((classDto.initialDate()).toString());

            classSearch.setDuration(classDto.duration());
            classSearch.setCourseId(course);
            classSearch.setInitialDate(dateSql);
            classSearch.setInstructorId(user);
            classSearch.setName(classDto.name());
            
            repoClass.save(classSearch);

            return classSearch;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public HttpStatus deleteClass(Long id) {
        try {
            ClassData classSearch = repoClass.findById(id).get();

            repoClass.delete(classSearch);

            return HttpStatus.OK;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }
    
}
