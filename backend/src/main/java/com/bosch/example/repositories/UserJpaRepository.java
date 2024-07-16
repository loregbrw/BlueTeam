package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bosch.example.model.ClassData;
import com.bosch.example.model.UserData;

public interface UserJpaRepository extends JpaRepository<UserData, Long> {
    List<UserData> findByClassId(ClassData classId);
} 
