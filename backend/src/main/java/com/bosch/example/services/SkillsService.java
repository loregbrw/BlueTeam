package com.bosch.example.services;


import java.util.List;

import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.SkillsRequest;
import com.bosch.example.model.SkillsData;

public interface SkillsService {
    SkillsData createSkill(SkillsRequest skill);
    List<SkillsData> getSkillsBySubjectClass(Long subjectClassId);
    List<SkillsData> getSkillByName(String name);
    SkillsData updateSkill(Long id, SkillsRequest skill);
    HttpStatus deleteSkill(Long id);
}
