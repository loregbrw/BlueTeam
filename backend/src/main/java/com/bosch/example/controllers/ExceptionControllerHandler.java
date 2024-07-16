package com.bosch.example.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;

import com.bosch.example.exception.ResponseException;

@ControllerAdvice
public class    ExceptionControllerHandler {
    public record Message (String message){}

    public ResponseEntity<Message> responseError(ResponseException ex, HttpServletRequest request){
        return ResponseEntity
                .status(ex.getStatusCode())
                .body(new Message(ex.getMessage()));
    }
}
