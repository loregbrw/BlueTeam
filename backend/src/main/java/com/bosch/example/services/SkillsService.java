package com.bosch.example.services;


import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.SkillsRequest;
import com.bosch.example.model.SkillsData;

public interface SkillsService {
    SkillsData createSkill(SkillsRequest skill);
    List<SkillsData> getSkillsBySubjectClass(Long subjectClassId);
    SkillsData getSkillByName(String name);
    SkillsData updateSkill(Long id, SkillsRequest skill);
    HttpStatusCode deleteSkill(Long id);
}
