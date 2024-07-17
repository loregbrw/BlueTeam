package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.AbilityRequest;
import com.bosch.example.exception.NotFoundException;
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
        try {
            UserData user = repoUser.findById(userId).get();
            List<AbilityData> abilities = repoAbility.findByUserId(user);

            return abilities;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }

    @Override
    public AbilityData updateAbility(Long id, AbilityRequest ability) {

        AbilityData abilitySearch = repoAbility.findById(id).get();
        
        if (abilitySearch == null) {
            throw new NotFoundException();
        }

        try {
            UserData user = repoUser.findById(ability.userId()).get();

            abilitySearch.setName(ability.name());
            abilitySearch.setStrength(ability.strenght());
            abilitySearch.setUserId(user);

            repoAbility.save(abilitySearch);

            return abilitySearch;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
        
    }

    @Override
    public HttpStatus deleteAbility(Long id) {
        try {
            AbilityData abilitySearch = repoAbility.findById(id).get();
            repoAbility.delete(abilitySearch);

            return HttpStatus.OK;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }
    
}
