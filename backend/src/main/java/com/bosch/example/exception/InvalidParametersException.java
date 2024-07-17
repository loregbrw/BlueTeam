package com.bosch.example.exception;

public class InvalidParametersException extends ResponseException {

    public InvalidParametersException() {
        super("Invalid Parameters", 404);
    }
}
