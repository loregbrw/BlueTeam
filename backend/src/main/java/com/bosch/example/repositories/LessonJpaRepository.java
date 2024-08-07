package com.bosch.example.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.LessonData;
import com.bosch.example.model.SubjectClassData;

@Repository
public interface LessonJpaRepository extends JpaRepository<LessonData, Long> {
    List<LessonData> findByTitleContaining(String title);
    List<LessonData> findBySubjectClassId(SubjectClassData classData);
}
