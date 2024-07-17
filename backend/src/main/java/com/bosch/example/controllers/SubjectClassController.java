package com.bosch.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.dtoRequest.SubjectClassRequest;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.services.SubjectClassService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/subjectclass")
public class SubjectClassController {
    @Autowired
    UserSession userSession;
    
    @Autowired
    SubjectClassService subjectClassService;

    @PostMapping("")
    public ResponseEntity<SubjectClassData> createSubjectClass(@RequestBody SubjectClassRequest subjectClassRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            SubjectClassData subjectClassCreated = subjectClassService.createSubjectClass(subjectClassRequest);
            return ResponseEntity.status(201).body(subjectClassCreated);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SubjectClassData>> getSSubjectClassByClass(@PathVariable Long id) {
        return ResponseEntity.ok().body(subjectClassService.getSubjectClassByClass(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectClassData> putSubjectClass(@PathVariable Long id, @PathVariable Long duration) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            SubjectClassData subjectClassUpdated = subjectClassService.updateSubjectClass(id, duration);
            return ResponseEntity.ok().body(subjectClassUpdated);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubjectClass(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            subjectClassService.deleteSubjectClass(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
