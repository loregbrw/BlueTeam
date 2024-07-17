package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.CourseData;

public interface CourseService {
    CourseData createCourse(String name);
    CourseData getCourseById(Long id);
    List<CourseData> getCourseByName(String name);
    List<CourseData> getAllCourses();
    CourseData updateCourse(Long id, String name);
    HttpStatus deleteCourse(Long id);
}
