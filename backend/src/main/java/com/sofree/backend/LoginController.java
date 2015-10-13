package com.sofree.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/login")
public class LoginController {
    private final FakeRepository repository;
    private static final String LOGIN_TOKEN = "8cd283d8b7bacc277f2bae5e26ce6d1e";

    @Autowired
    public LoginController(FakeRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = POST)
    public LogInResponse login(@RequestBody LoginRequest loginRequest) throws InterruptedException {
        Thread.sleep(1000);
        User user = repository.getUserByUsernameAndPassword(loginRequest.getUsername(), loginRequest.getPassword());
        return new LogInResponse(user, LOGIN_TOKEN);
    }

    static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }
}

