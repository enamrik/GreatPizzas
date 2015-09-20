package com.sofree.backend;

public class ErrorResponse {
    private String error;
    private int statusCode;

    public ErrorResponse(Exception exception, int statusCode) {
        this.statusCode = statusCode;
        this.error = exception.getMessage();
    }

    public String getError() {
        return error;
    }

    public int getStatusCode() {
        return statusCode;
    }
}
