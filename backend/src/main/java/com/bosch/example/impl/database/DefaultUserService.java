package com.bosch.example.impl.database;

import java.util.List;

import org.aspectj.apache.bcel.util.ClassLoaderReference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.UserRequest;
import com.bosch.example.exception.NotFoundException;
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

    @Override
    public UserData createUser(UserRequest user) {
        
        ClassData classData = repoClass.findById(user.classId()).get();

        if (classData == null) {
            throw new NotFoundException();
        }

        try {
            UserData newUser = new UserData(classData, user.edv(), user.name(), user.email(), user.role(), user.birthDate());
        }
    }

    @Override
    public UserData getUserById(long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserById'");
    }

    @Override
    public UserData updateUser(Long id, UserRequest user) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUser'");
    }

    @Override
    public UserData updateUserPassword(Long id, String password) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateUserPassword'");
    }

    @Override
    public HttpStatusCode deleteUser(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteUser'");
    }

    @Override
    public List<UserData> getClassUser(Long classId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getClassUser'");
    }
}
