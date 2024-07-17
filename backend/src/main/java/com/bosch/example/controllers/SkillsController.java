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
import com.bosch.example.dto.dtoRequest.SkillsRequest;
import com.bosch.example.model.SkillsData;
import com.bosch.example.services.SkillsService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/skills")
public class SkillsController {
    @Autowired
    UserSession userSession;
    
    @Autowired
    SkillsService skillsService;

    @PostMapping("")
    public ResponseEntity<SkillsData> createSkill(@RequestBody SkillsRequest skillsRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            SkillsData skillsCreated = skillsService.createSkill(skillsRequest);
            return ResponseEntity.status(201).body(skillsCreated);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SkillsData>> getSkillByName(@PathVariable String name) {
        return ResponseEntity.ok().body(skillsService.getSkillByName(name));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SkillsData>> getSkillBySubjectClass(@PathVariable Long id) {
        return ResponseEntity.ok().body(skillsService.getSkillsBySubjectClass(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<SkillsData> patchSkills(@PathVariable Long id, @RequestBody SkillsRequest skillsRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            SkillsData skillsUpdated = skillsService.updateSkill(id, skillsRequest);
            return ResponseEntity.ok().body(skillsUpdated);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            skillsService.deleteSkill(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
