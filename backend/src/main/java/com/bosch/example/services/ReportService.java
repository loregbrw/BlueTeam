package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.ReportData;

public interface ReportService {
    public ReportData create(Long userId, Long authorId, String description);
    public ReportData get(Long id);
    public List<ReportData> getReportToUser(Long userId);
    public ReportData getReportToLesson(Long LessonId);
    public HttpStatusCode delete(Long id);
} 
