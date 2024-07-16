package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.ClassData;

@Repository
public interface ClassJpaRepository extends JpaRepository<ClassData, Long> {
    List<ClassData> findByNameContaining(String name);
}
