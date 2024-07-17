package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.UserRequest;
import com.bosch.example.exception.InternalServerErrorException;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.exception.WeakPasswordException;
import com.bosch.example.impl.security.DeafultCryptographyService;
import com.bosch.example.model.ClassData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.ClassJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.UserService;

public class DefaultUserService implements UserService {

    @Autowired
    UserJpaRepository repoUser;

    @Autowired
    ClassJpaRepository repoClass;

    @Autowired
    DeafultCryptographyService cryptographyService;

    @Override
    public UserData createUser(UserRequest user) {
        
        ClassData classData = repoClass.findById(user.classId()).get();

        if (classData == null) {
            throw new NotFoundException();
        }

        try {
            SimpleDateFormat dateFormatter = new SimpleDateFormat("ddMMyyyy");

            String password = dateFormatter.format(user.birthDate());

            String salt = cryptographyService.generateSalt();
            password = cryptographyService.hashPassword(password, salt);

            Date dateSql = Date.valueOf((user.birthDate()).toString());
            UserData newUser = new UserData(classData, user.edv(), user.name(), user.email(), password, user.role(), dateSql);
            
            repoUser.save(newUser);
            return newUser;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public UserData getUserById(long id) {
        
        UserData user = repoUser.findById(id).get();

        if (user == null) {
            throw new NotFoundException();
        }

        return user;
    }

    @Override
    public UserData updateUser(Long id, UserRequest user) {

        UserData userData = repoUser.findById(id).get();

        if (userData == null) {
            throw new NotFoundException();
        }

        ClassData classData = repoClass.findById(user.classId()).get();

        if (classData == null) {
            throw new InvalidParameterException();
        }

        try {
            userData.setClassId(classData);
            userData.setEdv(user.edv());
            userData.setName(user.name());
            userData.setEmail(user.email());
            userData.setRole(user.role());

            Date dateSql = Date.valueOf((user.birthDate()).toString());

            userData.setBirthDate(dateSql);

            repoUser.save(userData);
            return userData;

        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public UserData updateUserPassword(Long id, String password) {
        
        UserData userData = repoUser.findById(id).get();

        if (userData == null) {
            throw new NotFoundException();
        }

        if (!cryptographyService.isStrongPassword(password)) {
            throw new WeakPasswordException();
        }

        try {
            String salt = cryptographyService.generateSalt();
            password = cryptographyService.hashPassword(password, salt);

            userData.setPassword(password);
            repoUser.save(userData);
            return userData;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public HttpStatusCode deleteUser(Long id) {
        
        UserData userData = repoUser.findById(id).get();

        if (userData == null) {
            throw new NotFoundException();
        }

        try {
            repoUser.delete(userData);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public List<UserData> getUserByClass(Long classId) {
        
        ClassData classData = repoClass.findById(classId).get();

        if (classData == null) {
            throw new NotFoundException();
        }

        try {
            List<UserData> users = repoUser.findByClassId(classData);
            return users;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

}
