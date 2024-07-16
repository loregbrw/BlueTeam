package com.bosch.example.services;


import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.SkillsData;

public interface SkillsService {
    SkillsData PostSkill(Long id, Long SubjectClassId, String Name, String description, Integer weight);
    List<SkillsData> GetSkillsSubjectClass(Long id);
    SkillsData GetSkill(String name);
    SkillsData PatchSkill(Long id, Long SubjectClassId, String Name, String description, Integer weight);
    HttpStatusCode DeleteSkill(Long id);
}
