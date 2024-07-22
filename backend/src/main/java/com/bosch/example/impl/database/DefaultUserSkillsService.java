package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.bosch.example.dto.dtoRequest.UserSkillRequest;
import com.bosch.example.exception.InternalServerErrorException;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.SkillsData;
import com.bosch.example.model.UserSkillsData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.SkillsJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.repositories.UserSkillsJpaRepository;
import com.bosch.example.services.UserSkillsService;

public class DefaultUserSkillsService implements UserSkillsService {

    @Autowired
    UserSkillsJpaRepository repoUserSkills;

    @Autowired
    UserJpaRepository repoUser;

    @Autowired
    SkillsJpaRepository repoSkills;

    @Override
    public UserSkillsData createUserSkills(UserSkillRequest userSkill) {
        
        UserData user = repoUser.findById(userSkill.userId()).get();

        if (user == null) {
            throw new NotFoundException();
        }

        SkillsData skill = repoSkills.findById(userSkill.skillsId()).get();

        if (skill == null) {
            throw new NotFoundException();
        }

        try {
            UserSkillsData newUserSkill = new UserSkillsData(user, skill, userSkill.value());
            repoUserSkills.save(newUserSkill);
            return newUserSkill;

        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<UserSkillsData> getUserSkillsByUser(Long userId) {
        UserData user = repoUser.findById(userId).get();

        if (user == null) {
            throw new NotFoundException();
        }

        try {
            List<UserSkillsData> userSkills = repoUserSkills.findByUserId(user);
            return userSkills;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public UserSkillsData updateUserSkills(Long id, Float value) {
        
        UserSkillsData userSkill = repoUserSkills.findById(id).get();

        if (userSkill == null) {
            throw new NotFoundException();
        }

        try {
            userSkill.setValue(value);
            repoUserSkills.save(userSkill);
            return userSkill;

        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<UserSkillsData> getAll() {
        try {
            List<UserSkillsData> userSkills = repoUserSkills.findAll();
            return userSkills;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

}
