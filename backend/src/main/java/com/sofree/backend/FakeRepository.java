package com.sofree.backend;

import org.apache.commons.io.IOUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static java.util.UUID.randomUUID;

public class FakeRepository {
    public List<Special> getSpecials() {
        return newArrayList(
                new Special("Veggie Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus erat", "http://localhost:4567/images/meat_lovers_pizza.jpg"),
                new Special("Meat Lovers Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "http://localhost:4567/images/veggie_pizza.jpg"),
                new Special("Hawaiian Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus erat, ultrices nec ultrices vitae", "http://localhost:4567/images/hawaiian_pizza.jpg")
        );
    }

    public byte[] getImageById(String imageId) throws IOException {
        InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream(imageId);
        return IOUtils.toByteArray(resourceAsStream);
    }

    public User getUserByUsernameAndPassword(String username, String password) {
        if(isNullOrEmptyWhitespace(username) || isNullOrEmptyWhitespace(password)) {
            throw new IllegalArgumentException(String.format("Missing username or password"));
        }
        if(username.equalsIgnoreCase("sam") && password.equals("password")) {
            return new User(randomUUID().toString(), "Sam", "Doe", "sam@gmail.com");
        }
        throw new UnAuthorizedException(username);
    }

    private static boolean isNullOrEmptyWhitespace(String value) {
        return value == null || value.trim().isEmpty();
    }
}
