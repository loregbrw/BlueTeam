package com.bosch.example.services;

import java.util.List;

import com.bosch.example.model.UserSkillsData;

public interface UserSkillsService {
    public UserSkillsData create(Long userId, Long skillsId, Float value);
    public List<UserSkillsData> getUserSkillsToUser(Long userId);
    public List<UserSkillsData> get(String name);
    UserSkillsData update(Float value);
}
