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
import com.bosch.example.dto.dtoRequest.SubjectRequest;
import com.bosch.example.model.SubjectData;
import com.bosch.example.services.SubjectService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/subject")
public class SubjectController {
        
    @Autowired
    UserSession userSession;
    
    @Autowired
    SubjectService subjectService;

    @PostMapping("")
    public ResponseEntity<SubjectData> createSubject(@RequestBody SubjectRequest subjectRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            SubjectData subjectCreated = subjectService.createSubject(subjectRequest);
            return ResponseEntity.status(201).body(subjectCreated);
        }
    }

    @GetMapping("name/{name}")
    public ResponseEntity<List<SubjectData>> getSubjectByName(@PathVariable String name) {
        return ResponseEntity.ok().body(subjectService.getSubjectByName(name));
    }

    @GetMapping("")
    public ResponseEntity<List<SubjectData>> getAllSubjects() {
        return ResponseEntity.ok().body(subjectService.getAllSubjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SubjectData>> getSubjectByCourse(@PathVariable Long id) {
        return ResponseEntity.ok().body(subjectService.getSubjectByCourseSubject(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SubjectData> patchSubject(@PathVariable Long id, SubjectRequest subjectRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            SubjectData subjectUpdated = subjectService.updateSubject(id, subjectRequest);
            return ResponseEntity.ok().body(subjectUpdated);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            subjectService.deleteSubject(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
