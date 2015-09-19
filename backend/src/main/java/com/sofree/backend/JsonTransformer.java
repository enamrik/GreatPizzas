package com.sofree.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import spark.ResponseTransformer;

public class JsonTransformer implements ResponseTransformer {

    private static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String render(Object model) {
        try {
            return objectMapper.writeValueAsString(model);
        } catch (JsonProcessingException e) {
            return "";
        }
    }
}
