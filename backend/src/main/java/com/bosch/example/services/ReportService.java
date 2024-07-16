package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.model.ReportData;

public interface ReportService {
    public ReportData createReport(Long userId, Long authorId, String description);
    public ReportData getReportById(Long id);
    public List<ReportData> getReportByUser(Long userId);
    public ReportData getReportByLesson(Long lessonId);
    public HttpStatusCode deleteReport(Long id);
} 
