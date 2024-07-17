package com.bosch.example.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bosch.example.model.LessonData;
import com.bosch.example.model.ReportData;
import com.bosch.example.model.UserData;

import java.util.List;


@Repository
public interface ReportJpaRepository extends JpaRepository<ReportData, Long> {
    List<ReportData> findByUserId(UserData userId);
    List<ReportData> findByLessonId(LessonData lessonId);
}
