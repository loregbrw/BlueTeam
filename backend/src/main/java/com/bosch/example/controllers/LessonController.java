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
import com.bosch.example.dto.dtoRequest.LessonRequest;
import com.bosch.example.model.LessonData;
import com.bosch.example.services.LessonService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/lesson")
public class LessonController {
    @Autowired
    UserSession userSession;

    @Autowired
    LessonService lessonService;

    @PostMapping("/auth")
    public ResponseEntity<LessonData> createLesson(@RequestBody LessonRequest lessonRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor)
                && !userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            LessonData lessonCreated = lessonService.createLesson(lessonRequest);
            return ResponseEntity.status(201).body(lessonCreated);
        }
    }

    @GetMapping("id/{id}")
    public ResponseEntity<LessonData> getLesson(@PathVariable Long id) {
        return ResponseEntity.ok().body(lessonService.getLessonById(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<LessonData>> getLessonBySubjectClass(@PathVariable Long id) {
        return ResponseEntity.ok().body(lessonService.getLessonByClass(id));
    }
    @GetMapping("/{id}")
    public ResponseEntity<List<LessonData>> getLessonByUserId(@PathVariable Long id) {
        return ResponseEntity.ok().body(lessonService.getLessonByClass(id));
    }

    @PatchMapping("auth/{id}")
    public ResponseEntity<LessonData> patchLesson(@PathVariable Long id, @RequestBody LessonRequest lessonRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor)
                && !userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            LessonData lessonUpdated = lessonService.updateLesson(id, lessonRequest);
            return ResponseEntity.ok().body(lessonUpdated);
        }
    }

    @DeleteMapping("auth/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor)
                && !userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            lessonService.deleteLesson(id);
            return ResponseEntity.ok().body("Deleted with sucessfully");
        }
    }
}
