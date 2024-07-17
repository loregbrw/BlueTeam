package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.AbilityData;
import com.bosch.example.model.UserData;

@Repository
public interface AbilityJpaRepository extends JpaRepository<AbilityData, Long> { 
    List<AbilityData> findByUserId(UserData user);
} 
