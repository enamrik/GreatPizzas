package com.sofree.backend;

public class Asset {
    private String name;
    private byte[] data;

    public Asset(String name, byte[] data) {
        this.name = name;
        this.data = data;
    }

    public String getName() {
        return name;
    }

    public byte[] getData() {
        return data;
    }
}
