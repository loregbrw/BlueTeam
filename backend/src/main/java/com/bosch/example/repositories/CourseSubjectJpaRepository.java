package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.CourseData;
import com.bosch.example.model.CourseSubjectData;
import com.bosch.example.model.SubjectData;

@Repository
public interface CourseSubjectJpaRepository extends JpaRepository<CourseSubjectData, Long> {
    List<CourseSubjectData> findByCourseId(CourseData course);
    List<CourseSubjectData> findBySubjectId(SubjectData subject);
 }
