package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.SubjectClassData;

@Repository
public interface SubjectClassJpaRepository extends JpaRepository<SubjectClassData, Long> { }
