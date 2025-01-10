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

    /**
     * Creates a response
     * @param response the response to be taken
     * @return whether the creation succeeded or not
     */
    public boolean createResponse(@NonNull Response response) {
        return repository.createResponse(response);
    }

    /**
     * Gets a response with query with field, value, and pageable object
     * @param field field to query on
     * @param value value to query on
     * @param pageable pageable object containing size and page number
     * @return
     */
    public Page<Response> getResponsePageByQuery(@NonNull String field, @NonNull String value,
            @NonNull Pageable pageable) {
        return value.isEmpty()
                ? repository.getAllResponses(field, pageable)
                : repository.getAllResponsesOfQuery(field, value, pageable);
    }
}