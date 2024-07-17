package com.bosch.example.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import com.bosch.example.dto.dtoRequest.ClassRequest;
import com.bosch.example.model.ClassData;

public interface ClassService {
    ClassData createClass(ClassRequest classDto);
    List<ClassData> getAllClasses();
    ClassData getClassById(Long id);
    List<ClassData> getClassByName(String name);
    ClassData updateClass(Long classId, ClassRequest classDto);
    HttpStatus deleteClass(Long id);
}
