package com.sofree.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class WebConfig {
    @Bean
    public FakeRepository fakeRepository() throws IOException {
        return new FakeRepository();
    }
}
