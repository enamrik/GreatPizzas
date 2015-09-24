package com.sofree.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.joda.JodaModule;
import spark.ResponseTransformer;

import java.io.IOException;

import static com.fasterxml.jackson.databind.SerializationFeature.INDENT_OUTPUT;

public class JsonTransformer implements ResponseTransformer {

    private static ObjectMapper objectMapper = new ObjectMapper().
            enable(INDENT_OUTPUT).
            registerModule(new JodaModule());

    public static String toJson(Object model) {
        try {
            return objectMapper.writeValueAsString(model);
        } catch (JsonProcessingException e) {
            return "";
        }
    }

    public static <T> T fromJson(String json, Class<T> modelClass) {
        try {
            return objectMapper.readValue(json, modelClass);
        } catch (IOException e) {
            throw new PayloadFormatException();
        }
    }

    @Override
    public String render(Object model) {
        return toJson(model);
    }
}

