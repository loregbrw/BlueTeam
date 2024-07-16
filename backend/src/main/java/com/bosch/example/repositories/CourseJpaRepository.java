package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.CourseData;

@Repository
public interface CourseJpaRepository extends JpaRepository<CourseData, Long> {
    List<CourseData> findByNameContaining(String name);
}
