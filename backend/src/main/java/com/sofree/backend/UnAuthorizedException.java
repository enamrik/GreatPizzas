package com.sofree.backend;

public class UnAuthorizedException extends RuntimeException {
    public UnAuthorizedException(String username) {
        super(String.format("Invalid username or password for %s", username));
    }
}
