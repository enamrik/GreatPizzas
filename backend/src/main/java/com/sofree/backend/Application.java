package com.sofree.backend;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.sofree.backend")
public class Application {
    public static void main(String[] args) {
        new SpringApplicationBuilder().sources(Application.class).build().run(args);
    }
}

