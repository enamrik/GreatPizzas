package com.sofree.backend;

public class PayloadFormatException extends RuntimeException {
    public PayloadFormatException() {
        super("Could not parse payload into JSON");
    }
}
