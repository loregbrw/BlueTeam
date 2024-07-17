package com.bosch.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.dtoRequest.UserSkillRequest;
import com.bosch.example.model.UserSkillsData;
import com.bosch.example.services.UserSkillsService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/userskills")
public class UserSkillsController {
    @Autowired
    UserSession userSession;
    
    @Autowired
    UserSkillsService userSkillsService;

    @PostMapping("")
    public ResponseEntity<UserSkillsData> createLesson(@PathVariable UserSkillRequest userSkillRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            UserSkillsData userSkillCreated = userSkillsService.createUserSkills(userSkillRequest);
            return ResponseEntity.status(201).body(userSkillCreated);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<UserSkillsData>> getUserSkillsByUser(@PathVariable Long id) {
        return ResponseEntity.ok().body(userSkillsService.getUserSkillsByUser(id));
    }

    @PutMapping("/{id}/{value}")
    public ResponseEntity<UserSkillsData> putUserSkills(@PathVariable Long id, @PathVariable Float value) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            UserSkillsData userSkillUpdated = userSkillsService.updateUserSkills(id, value);
            return ResponseEntity.ok().body(userSkillUpdated);
        }
    }
}
