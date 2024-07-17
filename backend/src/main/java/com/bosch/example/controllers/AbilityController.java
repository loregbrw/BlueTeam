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
import com.bosch.example.dto.dtoRequest.AbilityRequest;
import com.bosch.example.model.AbilityData;
import com.bosch.example.services.AbilityService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/ability")
public class AbilityController {
    @Autowired
    UserSession userSession;
    
    @Autowired
    AbilityService abilityService;

    @PostMapping("")
    public ResponseEntity<AbilityData> createAbility(@RequestBody AbilityRequest abilityRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            AbilityData abilityCreated = abilityService.createAbility(abilityRequest);
            return ResponseEntity.status(201).body(abilityCreated);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<AbilityData>> getAbilityByUser(@PathVariable Long id) {
        return ResponseEntity.ok().body(abilityService.getUserAbilities(id));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<AbilityData> patchAbility(@PathVariable Long id, @RequestBody AbilityRequest abilityRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            AbilityData abilityUpdated = abilityService.updateAbility(id, abilityRequest);
            return ResponseEntity.ok().body(abilityUpdated);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAbility(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            abilityService.deleteAbility(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
