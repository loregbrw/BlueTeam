package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import com.bosch.example.dto.dtoRequest.ReportRequest;
import com.bosch.example.exception.InternalServerErrorException;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.LessonData;
import com.bosch.example.model.ReportData;

import com.bosch.example.model.UserData;

import com.bosch.example.repositories.LessonJpaRepository;
import com.bosch.example.repositories.ReportJpaRepository;
import com.bosch.example.repositories.UserJpaRepository;
import com.bosch.example.services.ReportService;

public class DefaultReportService implements ReportService {

    @Autowired
    ReportJpaRepository repoReport;

    @Autowired
    UserJpaRepository repoUser;

    @Autowired
    LessonJpaRepository repoLesson;

    @Override
    public ReportData createReport(ReportRequest report) {

        UserData user = repoUser.findById(report.userId()).get();
        UserData author = repoUser.findById(report.authorId()).get();

        if (user == null || author == null) {
            throw new NotFoundException();
        }

        LessonData lesson = repoLesson.findById(report.lessonId()).get();

        if (lesson == null) {
            throw new NotFoundException();
        }

        try {
            ReportData reportData = new ReportData(user, author, report.description(), lesson);
            repoReport.save(reportData);
            return reportData;

        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public ReportData getReportById(Long id) {
        
        ReportData report = repoReport.findById(id).get();

        if (report == null) {
            throw new NotFoundException();
        }

        return report;
    }

    @Override
    public List<ReportData> getReportByUser(Long userId) {
        
        UserData user = repoUser.findById(userId).get();

        if (user == null) {
            throw new NotFoundException();
        }

        try {
            List<ReportData> reports = repoReport.findByUserId(user);
            return reports;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public List<ReportData> getReportByLesson(Long lessonId) {
        
        LessonData lesson = repoLesson.findById(lessonId).get();

        if (lesson == null) {
            throw new NotFoundException();
        }

        try {
            List<ReportData> reports = repoReport.findByLessonId(lesson);
            return reports;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }

    @Override
    public HttpStatusCode deleteReport(Long id) {
        ReportData report = repoReport.findById(id).get();

        if (report == null) {
            throw new NotFoundException();
        }

        try {
            repoReport.delete(report);
            return HttpStatus.OK;
        } catch (Exception e) {
            throw new InternalServerErrorException();
        }
    }
    
}
