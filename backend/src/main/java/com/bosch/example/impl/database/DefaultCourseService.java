package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.AbilityData;
import com.bosch.example.model.CourseData;
import com.bosch.example.model.LessonData;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.CourseJpaRepository;
import com.bosch.example.services.CourseService;

public class DefaultCourseService implements CourseService {

    @Autowired 
    CourseJpaRepository repoCourse;
    
    @Override
    public CourseData createCourse(String name) {
        try {
            CourseData newCourse = new CourseData(name);
            repoCourse.save(newCourse);

            return newCourse;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public CourseData getCourseById(Long id) {
        try {
            return repoCourse.findById(id).get();
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public List<CourseData> getCourseByName(String name) {
        try {
            return repoCourse.findByNameContaining(name);
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public List<CourseData> getAllCourses() {
        try {
            return repoCourse.findAll();
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public CourseData updateCourse(Long id, String name) {
        CourseData courseSearch = repoCourse.findById(id).get();

        if (courseSearch == null) {
            throw new NotFoundException();
        }

        try {
            courseSearch.setName(name);
            
            repoCourse.save(courseSearch);

            return courseSearch;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public HttpStatus deleteCourse(Long id) {
        try {
            CourseData courseSearch = repoCourse.findById(id).get();

            repoCourse.delete(courseSearch);

            return HttpStatus.OK;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }
    
}
