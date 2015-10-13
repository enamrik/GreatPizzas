package com.sofree.backend;

import org.joda.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import static com.sofree.backend.FakeRepository.newId;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

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

    @RequestMapping(value="/{id}", method = GET)
    public Special getSpecial(@PathVariable String id) {
        return repository.getSpecial(id);
    }

    @RequestMapping(method = POST)
    public ResponseEntity create(
            @RequestPart("special") SpecialPayload specialRequest,
            @RequestPart MultipartFile image) throws IOException {

        Special special = new Special(
                newId(),
                specialRequest.getTitle(),
                specialRequest.getDescription(),
                "/images/" + image.getOriginalFilename(),
                specialRequest.getAvailableOn());
        repository.addSpecial(special);

        repository.addAsset(image.getOriginalFilename(), image.getBytes());

       return ResponseEntity.created(URI.create("specials/" + special.getId())).build();
    }

    static class SpecialPayload {
        private String description;
        private String title;
        private LocalDate availableOn;

        public String getDescription() {
            return description;
        }

        public String getTitle() {
            return title;
        }

        public LocalDate getAvailableOn() {
            return availableOn;
        }
    }
}
