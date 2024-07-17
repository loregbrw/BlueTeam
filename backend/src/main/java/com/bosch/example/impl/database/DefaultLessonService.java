package com.bosch.example.impl.database;

import java.security.InvalidParameterException;
import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.bosch.example.dto.dtoRequest.LessonRequest;
import com.bosch.example.exception.NotFoundException;
import com.bosch.example.model.ClassData;
import com.bosch.example.model.LessonData;
import com.bosch.example.model.SubjectClassData;
import com.bosch.example.repositories.ClassJpaRepository;
import com.bosch.example.repositories.LessonJpaRepository;
import com.bosch.example.repositories.SubjectClassJpaRepository;
import com.bosch.example.services.LessonService;

public class DefaultLessonService implements LessonService {

    @Autowired
    SubjectClassJpaRepository repoSubjectClass;

    @Autowired
    LessonJpaRepository repoLesson;

    @Autowired
    ClassJpaRepository repoClass;

    @Override
    public LessonData createLesson(LessonRequest lesson) {
        try {
            SubjectClassData subjectClassData = repoSubjectClass.findById(lesson.subjectClassId()).get();
            Date dateSql = Date.valueOf((lesson.date()).toString());
            LessonData newLesson = new LessonData(subjectClassData, lesson.title(), lesson.description(), lesson.shift(), dateSql);
            repoLesson.save(newLesson);

            return newLesson;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public List<LessonData> getLessonByTitle(String title) {
        try {
            List<LessonData> lessons = repoLesson.findByTitleContaining(title);
            return lessons;
        } catch (Exception e) {
            throw new NotFoundException();
        }
    }

    @Override
    public List<LessonData> getLessonByClass(Long classId) {
        try {
            ClassData classData = repoClass.findById(classId).get();
            List<LessonData> lessons = repoLesson.findByClassId(classData);

            return lessons;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }

    @Override
    public LessonData updateLesson(Long lessonId, LessonRequest lesson) {
        LessonData lessonSearch = repoLesson.findById(lessonId).get();

        if (lessonSearch == null) {
            throw new NotFoundException();
        }

        try {
            SubjectClassData subjectClass = repoSubjectClass.findById(lesson.subjectClassId()).get();
            Date dateSql = Date.valueOf((lesson.date()).toString());

            lessonSearch.setTitle(lesson.title());
            lessonSearch.setShift(lesson.shift());
            lessonSearch.setDescription(lesson.description());
            lessonSearch.setSubjectClassId(subjectClass);
            lessonSearch.setDate(dateSql);
            
            repoLesson.save(lessonSearch);

            return lessonSearch;
        } catch (Exception e) {
            throw new InvalidParameterException();
        }
    }

    @Override
    public HttpStatus deleteLesson(Long id) {
        try {
            LessonData lessonSearch = repoLesson.findById(id).get();

            repoLesson.delete(lessonSearch);

            return HttpStatus.OK;
        } catch (Exception e){
            throw new NotFoundException();
        }
    }
}
