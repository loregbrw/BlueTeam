package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.SkillsData;
import com.bosch.example.model.SubjectClassData;

import java.util.List;


@Repository
public interface SkillsJpaRepository extends JpaRepository<SkillsData, Long> {
    List<SkillsData> findBySubjectClassId(SubjectClassData subjectClassId);
    List<SkillsData> findByNameContaining(String name);
 }
