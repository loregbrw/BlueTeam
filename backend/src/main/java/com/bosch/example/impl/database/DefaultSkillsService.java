package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import com.bosch.example.dto.dtoRequest.SkillsRequest;
import com.bosch.example.exception.InternalServerErrorException;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.SkillsData;
import com.bosch.example.model.SubjectClassData;
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

        SubjectClassData subjectClass = repoSubjectClass.findById(skill.subjectClassId()).get();
    
        if (subjectClass == null) {
            throw new NotFoundException();
        }

        try {
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
    public List<SkillsData> getSkillByName(String name) {
        try {
            List<SkillsData> skills = repoSkills.findByNameContaining(name);
            return skills;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public SkillsData updateSkill(Long id, SkillsRequest skill) {

        SkillsData skillData = repoSkills.findById(id).get();

        if (skillData == null) {
            throw new NotFoundException();
        }
        
        SubjectClassData subjectClass = repoSubjectClass.findById(skill.subjectClassId()).get();

        if (subjectClass == null) {
            throw new NotFoundException();
        }
        
        try {

            skillData.setSubjectClassId(subjectClass);
            skillData.setName(skill.name());
            skillData.setDescription(skill.description());
            skillData.setWeight(skill.weight());

            repoSkills.save(skillData);
            return skillData;

        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public HttpStatus deleteSkill(Long id) {
        
        SkillsData skillData = repoSkills.findById(id).get();

        if (skillData == null) {
            throw new NotFoundException();
        }

        try {
            repoSkills.delete(skillData);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

}
