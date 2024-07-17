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
import com.bosch.example.dto.dtoRequest.UserRequest;
import com.bosch.example.model.UserData;
import com.bosch.example.services.UserService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserSession userSession;
    
    @Autowired
    UserService userService;

    @PostMapping("")
    public ResponseEntity<UserData> createUser(@RequestBody UserRequest userRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            UserData userCreated = userService.createUser(userRequest);
            return ResponseEntity.status(201).body(userCreated);
        }
    }

    @GetMapping("id/{id}")
    public ResponseEntity<UserData> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.getUserById(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<UserData>> getUserByClass(@PathVariable Long id) {
        return ResponseEntity.ok().body(userService.getUserByClass(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserData> putSubjectClass(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            UserData userUpdated = userService.updateUser(id, userRequest);
            return ResponseEntity.ok().body(userUpdated);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSubjectClass(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Server)) {
            return ResponseEntity.status(403).body(null);
        } else {
            userService.deleteUser(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
