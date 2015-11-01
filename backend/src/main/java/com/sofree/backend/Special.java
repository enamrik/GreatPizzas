package com.sofree.backend;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.joda.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Special {
    private String id;
    private String title;
    private String description;
    private String image;
    private LocalDate availableOn;
}
