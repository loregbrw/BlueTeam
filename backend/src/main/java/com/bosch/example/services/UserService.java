package com.bosch.example.services;

import java.sql.Date;
import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.model.ClassData;
import com.bosch.example.model.UserData;

public interface UserService {
    UserData createUser(ClassData classid, Long edv,String name, String foto, String email,UserRoleEnum role, Date birthDate);
    List<UserData> getUserById (long id);
    UserData editUser(Long id, ClassData classid, Long edv, String name, String foto, String email, UserRoleEnum role, Date birthDate);
    HttpStatusCode deleteUser(Long id);
    List<UserData> getClassUser(Long classId);
}
