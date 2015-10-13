package com.sofree.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/specials")
public class SpecialsController {
    private final FakeRepository repository;

    @Autowired
    public SpecialsController(FakeRepository repository) {
        this.repository = repository;
    }

    @RequestMapping(method = GET)
    public List<Special> getSpecials() {
        return repository.getSpecials();
    }
}
