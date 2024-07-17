package com.bosch.example.services;

import java.util.List;

import com.bosch.example.dto.dtoRequest.UserSkillRequest;
import com.bosch.example.model.UserSkillsData;

public interface UserSkillsService {
    public UserSkillsData createUserSkills(UserSkillRequest userSkill);
    public List<UserSkillsData> getUserSkillsByUser(Long userId);
    UserSkillsData updateUserSkills(Long is, Float value);
}
