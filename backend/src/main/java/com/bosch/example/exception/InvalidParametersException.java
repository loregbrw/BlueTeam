package com.bosch.example.exception;

public class InvalidParametersException extends ResponseException {

    public InvalidParametersException(String message, int statusCode) {
        super("Invalid Parameters", 404);
    }
}
