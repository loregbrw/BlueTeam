package com.bosch.example.services;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.ClassData;

public interface ClassService {
    ClassData createClass(Long courseId, Long instructorId, String name, Long duration, Date initialDate);
    List<ClassData> getAllClasses();
    ClassData getClassById(Long id);
    ClassData getClassByName(String name);
    ClassData updateClass(Long courseId, Long instructorId, String name, Long duration, Date initialDate);
    HttpStatusCode deleteClass(Long id);
}
