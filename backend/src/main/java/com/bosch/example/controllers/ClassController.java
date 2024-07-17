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
import com.bosch.example.model.ClassData;
import com.bosch.example.services.ClassService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/class")
public class ClassController {

    @Autowired
    UserSession userSession;
    
    @Autowired
    ClassService classService;

    @PostMapping("/auth")
    public ResponseEntity<ClassData> createClass(@RequestBody ClassRequest classRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor) && !userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            ClassData classCreated = classService.createClass(classRequest);
            return ResponseEntity.status(201).body(classCreated);
        }
    }

    @GetMapping("id/{id}")
    public ResponseEntity<ClassData> getClass(@PathVariable Long id) {
        return ResponseEntity.ok().body(classService.getClassById(id));
    }

    @GetMapping("/{name}")
    public ResponseEntity<List<ClassData>> getClassByName(@PathVariable String name) {
        return ResponseEntity.ok().body(classService.getClassByName(name));
    }

    @GetMapping("")
    public ResponseEntity<List<ClassData>> getAllClasses() {
        return ResponseEntity.ok().body(classService.getAllClasses());
    }

    @PatchMapping("auth/{id}")
    public ResponseEntity<ClassData> patchClass(@PathVariable Long id, @RequestBody ClassRequest classRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            ClassData classUpdated = classService.updateClass(id, classRequest);
            return ResponseEntity.ok().body(classUpdated);
        }
    }

    @DeleteMapping("auth/{id}")
    public ResponseEntity<?> deleteClass(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) && !userSession.getRole().equals(UserRoleEnum.Instructor) && !userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            classService.deleteClass(id);
            return ResponseEntity.ok().body("Deleted with sucessfully");
        }
    }
}
