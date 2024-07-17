package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.SkillsRequest;
import com.bosch.example.exception.InternalServerErrorException;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.AbilityData;
import com.bosch.example.model.SkillsData;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.model.UserData;
import com.bosch.example.repositories.SkillsJpaRepository;
import com.bosch.example.repositories.SubjectClassJpaRepository;
import com.bosch.example.services.SkillsService;

public class DefaultSkillsService implements SkillsService {

    @Autowired
    SkillsJpaRepository repoSkills;

    @Autowired
    SubjectClassJpaRepository repoSubjectClass;

    @Override
    public SkillsData createSkill(SkillsRequest skill) {
        try {
            SubjectClassData subjectClass = repoSubjectClass.findById(skill.subjectClassId()).get();

            if (subjectClass == null) {
                throw new NotFoundException();
            }

            SkillsData newSkill = new SkillsData(subjectClass, skill.name(), skill.description(), skill.weight());
            repoSkills.save(newSkill);
            return newSkill;

        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<SkillsData> getSkillsBySubjectClass(Long subjectClassId) {

        SubjectClassData subjectClass = repoSubjectClass.findById(subjectClassId).get();

        if (subjectClass == null) {
            throw new NotFoundException();
        }

        try {
            List<SkillsData> skills = repoSkills.findBySubjectClassId(subjectClass);
            return skills;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public SkillsData getSkillByName(String name) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSkillByName'");
    }

    @Override
    public SkillsData updateSkill(Long id, SkillsRequest skill) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateSkill'");
    }

    @Override
    public HttpStatusCode deleteSkill(Long id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteSkill'");
    }

}
