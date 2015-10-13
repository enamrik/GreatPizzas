package com.sofree.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class WebConfig {
    @Bean
    public FakeRepository fakeRepository() {
        return new FakeRepository();
    }
}
