package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.ReportRequest;
import com.bosch.example.model.ReportData;

public interface ReportService {
    public ReportData createReport(ReportRequest report);
    public ReportData getReportById(Long id);
    public List<ReportData> getReportByUser(Long userId);
    public ReportData getReportByLesson(Long lessonId);
    public HttpStatusCode deleteReport(Long id);
} 
