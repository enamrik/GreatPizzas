package com.sofree.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

import java.io.IOException;

@Configuration
public class WebConfig {
    @Bean
    public FakeRepository fakeRepository() throws IOException {
        return new FakeRepository();
    }

    @Primary
    @Bean
    public ObjectMapper objectMapper(Jackson2ObjectMapperBuilder builder) {
        return builder.
                modules(new JodaModule()).
                build().
                configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
    }
}
