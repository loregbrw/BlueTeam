package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.ReportRequest;
import com.bosch.example.model.ReportData;

public interface ReportService {
    public ReportData createReport(ReportRequest report);
    public ReportData getReportById(Long id);
    public List<ReportData> getReportByUser(Long userId);
    public List<ReportData> getReportByLesson(Long lessonId);
    public HttpStatus deleteReport(Long id);
} 
