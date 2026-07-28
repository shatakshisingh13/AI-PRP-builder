package com.prdbuilder.exception;

import com.prdbuilder.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.RestClientException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Unable to generate PRD: " + ex.getMessage()));
    }

    @ExceptionHandler(RestClientException.class)
    public ResponseEntity<ErrorResponse> handleRestClientException(RestClientException ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(new ErrorResponse("Unable to generate PRD. AI service unavailable."));
    }
}
