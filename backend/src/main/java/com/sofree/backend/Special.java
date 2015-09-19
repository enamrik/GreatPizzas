package com.sofree.backend;

public class Special {
    private String title;
    private String description;
    private String image;

    public Special() {}

    public Special(String title, String description, String image) {
        this.title = title;
        this.description = description;
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }
}
