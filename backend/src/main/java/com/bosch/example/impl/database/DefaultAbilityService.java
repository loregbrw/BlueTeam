package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.AbilityRequest;
import com.bosch.example.model.AbilityData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.AbilityJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.AbilityService;

public class DefaultAbilityService implements AbilityService {

    @Autowired
    AbilityJpaRepository repoAbility;

    @Autowired
    UserJpaRepository repoUser;

    @Override
    public AbilityData createAbility(AbilityRequest ability) {
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
    public List<AbilityData> getUserAbilities(Long userId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserAbilities'");
    }

    @Override
    public AbilityData updateAbility(Long id, AbilityRequest ability) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateAbility'");
    }

    @Override
    public HttpStatusCode deleteAbility(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteAbility'");
    }
    
}
