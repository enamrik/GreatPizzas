package com.sofree.backend;

import org.apache.commons.io.IOUtils;
import org.joda.time.LocalDate;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static java.util.UUID.randomUUID;

public class FakeRepository {
    List<Special> specials = new ArrayList<>();
    List<Asset> assets = new ArrayList<>();

    public FakeRepository() throws IOException {
        specials.add(new Special(newId(), "Veggie Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus erat", "/images/meat_lovers_pizza.jpg", LocalDate.now().plusDays(20)));
        specials.add(new Special(newId(), "Meat Lovers Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "/images/veggie_pizza.jpg", LocalDate.now()));
        specials.add(new Special(newId(), "Hawaiian Pizza", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tellus erat, ultrices nec ultrices vitae", "/images/hawaiian_pizza.jpg", LocalDate.now().plusDays(5)));

        addResourceAsset("meat_lovers_pizza.jpg");
        addResourceAsset("veggie_pizza.jpg");
        addResourceAsset("hawaiian_pizza.jpg");
    }

    public static String newId() {
        return UUID.randomUUID().toString();
    }

    public List<Special> getSpecials() {
        return specials;
    }

    public Special getSpecial(String id) {
        return specials.stream().filter(x -> x.getId().equals(id)).findFirst().get();
    }

    public void addSpecial(Special special) {
        specials.add(special);
    }

    public void addAsset(String name, byte[] data) {
        assets.add(new Asset(name, data));
    }

    public byte[] getImageById(String imageId) throws IOException {
        return assets.<Asset>stream().filter(x -> x.getName().equals(imageId)).findFirst().get().getData();
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

    private void addResourceAsset(String name) throws IOException {
        assets.add(new Asset(name, getResourceBytes(name)));
    }

    private byte[] getResourceBytes(String name) throws IOException {
        InputStream resourceAsStream = this.getClass().getClassLoader().getResourceAsStream(name);
        return IOUtils.toByteArray(resourceAsStream);
    }
}

