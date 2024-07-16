package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.UserSkillsData;

@Repository
public interface UserSkillsJpaRepository extends JpaRepository<UserSkillsData, Long> { }
