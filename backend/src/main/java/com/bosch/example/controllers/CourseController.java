package com.bosch.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.dtoRequest.ClassRequest;
import com.bosch.example.model.CourseData;
import com.bosch.example.model.CourseData;
import com.bosch.example.services.CourseService;
import com.bosch.example.services.CourseService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/course")
public class CourseController {
    
    @Autowired
    UserSession userSession;
    
    @Autowired
    CourseService courseService;

    @PostMapping("")
    public ResponseEntity<CourseData> createClass(@PathVariable String name) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            CourseData classCreated = courseService.createCourse(name);
            return ResponseEntity.status(201).body(classCreated);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseData> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok().body(courseService.getCourseById(id));
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<CourseData>> getCourseByName(@PathVariable String name) {
        return ResponseEntity.ok().body(courseService.getCourseByName(name));
    }

    @GetMapping("")
    public ResponseEntity<List<CourseData>> getAllCourses() {
        return ResponseEntity.ok().body(courseService.getAllCourses());
    }

    @PatchMapping("/{id}/{name}")
    public ResponseEntity<CourseData> patchCourse(@PathVariable Long id, @PathVariable String name) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            CourseData coursUpdated = courseService.updateCourse(id, name);
            return ResponseEntity.ok().body(coursUpdated);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            courseService.deleteCourse(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
