package com.bosch.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bosch.example.Enum.UserRoleEnum;
import com.bosch.example.dto.dtoRequest.ReportRequest;
import com.bosch.example.model.ReportData;
import com.bosch.example.services.ReportService;
import com.bosch.example.sessions.UserSession;

@RestController
@RequestMapping("/report")
public class ReportController {
        
    @Autowired
    UserSession userSession;
    
    @Autowired
    ReportService reportService;

    @PostMapping("")
    public ResponseEntity<ReportData> createReport(@RequestBody ReportRequest reportRequest) {
        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            ReportData reportCreated = reportService.createReport(reportRequest);
            return ResponseEntity.status(201).body(reportCreated);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReportData> getReport(@PathVariable Long id) {
        return ResponseEntity.ok().body(reportService.getReportById(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReportData>> getReportByUser(@PathVariable Long id) {
        return ResponseEntity.ok().body(reportService.getReportByUser(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<ReportData>> getReportByLesson(@PathVariable Long id) {
        return ResponseEntity.ok().body(reportService.getReportByLesson(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {

        if (!userSession.getRole().equals(UserRoleEnum.Adm) || userSession.getRole().equals(UserRoleEnum.Instructor)) {
            return ResponseEntity.status(403).body(null);
        } else {
            reportService.deleteReport(id);
            return ResponseEntity.ok().body(null);
        }
    }
}
