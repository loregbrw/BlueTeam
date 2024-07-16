package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.CourseData;

public interface CourseService {
    CourseData createCourse(String name);
    CourseData getCourse(Long id);
    CourseData getCourseQuery(String query);
    List<CourseData> getAllCourses();
    CourseData editCourse(String name);
    HttpStatusCode deleteCourse(Long id);
}
