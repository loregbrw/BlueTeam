package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.ClassData;
import com.bosch.example.model.SubjectClassData;

@Repository
public interface SubjectClassJpaRepository extends JpaRepository<SubjectClassData, Long> { 
    List<SubjectClassData> findByClassId(ClassData classData);
}
