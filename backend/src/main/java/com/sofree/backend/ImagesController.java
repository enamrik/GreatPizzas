package com.sofree.backend;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@RequestMapping("/images")
public class ImagesController {
    private final FakeRepository repository;

    @Autowired
    public ImagesController(FakeRepository repository) {
        this.repository = repository;
    }

    @RequestMapping( value="/{imageName:.+}", method = GET)
    public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
        return ResponseEntity.
                ok().
                header("Content-Type", "image/" + FilenameUtils.getExtension(imageName)).
                body(repository.getImageById(imageName));
    }
}

