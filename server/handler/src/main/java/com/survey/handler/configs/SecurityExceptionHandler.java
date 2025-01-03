package com.survey.handler.configs;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SecurityExceptionHandler {

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<APIError> handleAuthenticationException(AuthenticationException ex) {
        APIError error = new APIError(
            HttpStatus.UNAUTHORIZED.value(),
            "Authentication failed",
            ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    private class APIError {
        private final int status;
        private final String message;
        private final String details;
    
        public APIError(int status, String message, String details) {
            this.status = status;
            this.message = message;
            this.details = details;
        }
    }
}


