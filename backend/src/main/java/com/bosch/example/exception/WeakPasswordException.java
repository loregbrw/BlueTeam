package com.bosch.example.exception;

public class WeakPasswordException extends ResponseException {

    public WeakPasswordException() {
        super("Weak password", 400);
    }
}
