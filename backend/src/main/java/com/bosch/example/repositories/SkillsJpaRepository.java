package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.SkillsData;

@Repository
public interface SkillsJpaRepository extends JpaRepository<SkillsData, Long> { }
