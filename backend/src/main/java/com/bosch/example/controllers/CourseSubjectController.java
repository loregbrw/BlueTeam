package com.bosch.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.dtoRequest.CourseSubjectRequest;
import com.bosch.example.model.CourseSubjectData;
import com.bosch.example.services.CourseSubjectService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/coursesubject")
public class CourseSubjectController {
    
    @Autowired
    UserSession userSession;
    
    @Autowired
    CourseSubjectService courseSubjectService;

    @PostMapping("/auth")
    public ResponseEntity<CourseSubjectData> createCourseSubject(@RequestBody CourseSubjectRequest course) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor) && !userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            CourseSubjectData classCreated = courseSubjectService.createCourseSubject(course);
            return ResponseEntity.status(201).body(classCreated);
        }
    }
}