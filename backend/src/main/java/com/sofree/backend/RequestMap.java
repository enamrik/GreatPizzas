package com.sofree.backend;

import java.util.HashMap;

import static com.sofree.backend.JsonTransformer.fromJson;

public class RequestMap extends HashMap<String, Object> {
    public static RequestMap parse(String json) {
        return fromJson(json, RequestMap.class);
    }

    public String getString(String key) {
       return getOrDefault(key, "").toString();
    }
}
