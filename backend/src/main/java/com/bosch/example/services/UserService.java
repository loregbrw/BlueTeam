package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import com.bosch.example.dto.dtoRequest.UserRequest;
import com.bosch.example.model.UserData;

public interface UserService {
    UserData createUser(UserRequest user);
    UserData getUserById (long id);
    UserData updateUser(Long id, UserRequest user);
    UserData updateUserPassword(Long id, String password);
    HttpStatus deleteUser(Long id);
    List<UserData> getUserByClass(Long classId);
}
