package com.survey.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.NonNull;

@Service
public class ResponseService {
    @Autowired
    private ResponseRepository repository;

    public boolean createResponse(@NonNull Response response) {
        return repository.createResponse(response);
    }

    public Page<Response> getResponsePageByQuery(@NonNull String field, @NonNull String value,
            @NonNull Pageable pageable) {
        return value.isEmpty()
                ? repository.getAllResponses(field, pageable)
                : repository.getAllResponsesOfQuery(field, value, pageable);
    }
}