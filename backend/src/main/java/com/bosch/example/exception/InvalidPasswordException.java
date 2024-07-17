package com.bosch.example.exception;

public class InvalidPasswordException extends ResponseException {

    public InvalidPasswordException() {
        super("Invalid password", 400);
    }
}
