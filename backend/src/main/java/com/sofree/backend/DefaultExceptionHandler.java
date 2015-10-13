package com.sofree.backend;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class DefaultExceptionHandler extends ResponseEntityExceptionHandler {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler({IllegalArgumentException.class, PayloadFormatException.class})
    public void badRequest() {}

    @ResponseStatus(value = HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({UnAuthorizedException.class})
    public void unauthorized() {}
}
