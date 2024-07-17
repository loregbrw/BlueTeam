package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.CourseRequest;
import com.bosch.example.model.CourseData;

public interface CourseService {
    CourseData createCourse(CourseRequest course);
    CourseData getCourseById(Long id);
    List<CourseData> getCourseByName(String name);
    List<CourseData> getAllCourses();
    CourseData updateCourse(Long id, CourseRequest course);
    HttpStatus deleteCourse(Long id);
}
