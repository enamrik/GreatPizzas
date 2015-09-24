package com.sofree.backend;

import org.apache.commons.io.IOUtils;
import org.joda.time.LocalDate;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import static com.google.common.collect.Lists.newArrayList;
import static java.util.UUID.randomUUID;

public class FakeRepository {
    public List<Special> getSpecials() {
        return newArrayList(
                new Special("Veggie Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus erat", "/images/meat_lovers_pizza.jpg", LocalDate.now().plusDays(20)),
                new Special("Meat Lovers Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "/images/veggie_pizza.jpg", LocalDate.now()),
                new Special("Hawaiian Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus erat, ultrices nec ultrices vitae", "/images/hawaiian_pizza.jpg", LocalDate.now().plusDays(5))
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
