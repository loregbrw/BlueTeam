package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.AbilityData;

@Repository
public interface AbilityJpaRepository extends JpaRepository<AbilityData, Long> { } 
