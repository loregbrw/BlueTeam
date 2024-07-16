package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.SubjectData;

@Repository
public interface SubjectJpaRepository extends JpaRepository<SubjectData, Long> {
    List<SubjectData> findByNameContaining(String name);
}
