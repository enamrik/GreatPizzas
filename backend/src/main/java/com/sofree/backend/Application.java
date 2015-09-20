package com.sofree.backend;

import org.apache.commons.io.FilenameUtils;
import spark.Response;
import spark.ResponseTransformer;

import javax.servlet.http.HttpServletResponse;

import static com.sofree.backend.JsonTransformer.toJson;
import static spark.Spark.*;

public class Application {
    private static FakeRepository repository = new FakeRepository();
    private static ResponseTransformer inJson = new JsonTransformer();

    public static void main(String[] args) {
        configureWebApp();

        get("/specials", (request, response) -> repository.getSpecials(), inJson);

        get("/images/:imageName", (request, response) -> {
            String imageName = request.params(":imageName");
            HttpServletResponse raw = response.raw();
            raw.setContentType("image/" + FilenameUtils.getExtension(imageName));
            raw.getOutputStream().write(repository.getImageById(imageName));
            raw.getOutputStream().flush();
            raw.getOutputStream().close();
            return response.raw();
        });

        post("/login", (request, response) -> {
            RequestMap model = RequestMap.parse(request.body());
            User user = repository.getUserByUsernameAndPassword(model.getString("username"), model.getString("password"));
            return new LogInResponse(user, LOGIN_TOKEN);
        }, inJson);
    }

    private static final String LOGIN_TOKEN = "8cd283d8b7bacc277f2bae5e26ce6d1e";

    private static void configureWebApp() {
        after((request, response) -> response.type("application/json"));
        exception(Exception.class, (e, request, response) -> writeErrorToResponse(new ErrorResponse(e, 500), response));
        exception(IllegalArgumentException.class, (e, request, response) -> writeErrorToResponse(new ErrorResponse(e, 400), response));
        exception(UnAuthorizedException.class, (e, request, response) -> writeErrorToResponse(new ErrorResponse(e, 401), response));
    }

    private static void writeErrorToResponse(ErrorResponse errorResponse, Response response) {
        response.status(errorResponse.getStatusCode());
        response.type("application/json");
        response.body(toJson(errorResponse));
    }
}
