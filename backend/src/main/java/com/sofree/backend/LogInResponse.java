package com.sofree.backend;

public class LogInResponse {
    private User user;
    private String token;

    public LogInResponse(User user, String token) {
        this.user = user;
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public String getToken() {
        return token;
    }
}
