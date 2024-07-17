package com.bosch.example.exception;

public class InternalServerErrorException extends ResponseException {

    public InternalServerErrorException() {
        super("Internal server error", 502);
    }
}
