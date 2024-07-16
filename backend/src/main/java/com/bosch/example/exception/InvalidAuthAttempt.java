package com.bosch.example.exception;

public class InvalidAuthAttempt extends ResponseException {
    public InvalidAuthAttempt(){
        super("Inable to authenticate", 400);
    }
    
}
