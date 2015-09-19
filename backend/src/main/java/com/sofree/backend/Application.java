package com.sofree.backend;

import org.apache.commons.io.FilenameUtils;
import spark.ResponseTransformer;

import javax.servlet.http.HttpServletResponse;

import static spark.Spark.get;

public class Application {
    private static FakeRepository repository = new FakeRepository();
    private static ResponseTransformer toJson = new JsonTransformer();

    public static void main(String[] args) {
        get("/specials", (req, res) -> repository.getSpecials(), toJson);

        get("/images/:imageName", (req, res) -> {
            String imageName = req.params(":imageName");
            HttpServletResponse raw = res.raw();
            raw.setContentType("image/" + FilenameUtils.getExtension(imageName));
            raw.getOutputStream().write(repository.getImageById(imageName));
            raw.getOutputStream().flush();
            raw.getOutputStream().close();
            return res.raw();
        });
    }
}

