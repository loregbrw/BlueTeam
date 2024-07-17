package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.SubjectClassRequest;
import com.bosch.example.model.AbilityData;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.AbilityJpaRepository;
import com.bosch.example.repositories.SubjectClassJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.SubjectClassService;

public class DefaultSubjectClassService implements SubjectClassService {

    @Autowired
    SubjectClassJpaRepository reposubject;

    @Autowired
    UserJpaRepository repoUser;

    @Override
    public SubjectClassData createSubjectClass(SubjectClassRequest subjectClass) {
        try {
            UserData user = repoUser.findById(ability.userId()).get();

            AbilityData newAbility = new AbilityData(user, ability.name(), ability.strenght());
            repoAbility.save(newAbility);

            return newAbility;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<SubjectClassData> getSubjectClassByClass(Long classId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSubjectClassByClass'");
    }

    @Override
    public SubjectClassData updateSubjectClass(Long id, Long duration) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateSubjectClass'");
    }

    @Override
    public HttpStatus deleteSubjectClass(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteSubjectClass'");
    }
    
}
