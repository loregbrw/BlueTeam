package com.bosch.example.exception;

public class NotFoundException extends ResponseException {

    public NotFoundException() {
        super("Not Found", 404);
    }
}
