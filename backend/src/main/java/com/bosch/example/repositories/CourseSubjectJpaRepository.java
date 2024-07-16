package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.CourseSubjectData;

@Repository
public interface CourseSubjectJpaRepository extends JpaRepository<CourseSubjectData, Long> { }
