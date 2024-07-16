package com.bosch.example.services;


import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.SkillsData;

public interface SkillsService {
    SkillsData createSkill(Long id, Long subjectClassId, String name, String description, Integer weight);
    List<SkillsData> getSkillsBySubjectClass(Long subjectClassId);
    SkillsData getSkillByName(String name);
    SkillsData updateSkill(Long id, String name, String description, Integer weight);
    HttpStatusCode deleteSkill(Long id);
}
