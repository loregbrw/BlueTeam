package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.HabilityData;

@Repository
public interface HabilityJpaRepository extends JpaRepository<HabilityData, Long> { } 
