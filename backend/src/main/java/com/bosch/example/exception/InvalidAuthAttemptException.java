package com.bosch.example.exception;

public class InvalidAuthAttemptException extends ResponseException {
    public InvalidAuthAttemptException(){
        super("Inable to authenticate", 400);
    }
    
}
