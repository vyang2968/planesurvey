package com.survey.handler;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ResponseRepository {
    /**
     * Creates a response into the database.
     * 
     * @param response the response entity to be created
     * @return whether the response was successfully created
     */
    boolean createResponse(Response response);

    /**
     * Performs as-you-type search on the specified field with value with pagination
     * support
     * 
     * @param field    field to search on
     * @param value    value to search field with
     * @param pageable object containing page size and page number
     * @return page of responses
     */
    Page<Response> getAllResponsesOfQuery(String field, String value, Pageable pageable);

    /**
     * Gets all respones that have a field (which is all of them)
     * 
     * @param field    field to search on
     * @param pageable object containing page size and page number
     * @return page of responses
     */
    Page<Response> getAllResponses(String field, Pageable pageable);
}
