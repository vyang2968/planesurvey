package com.survey.handler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {
    @Autowired
    private ResponseService service;

    @PostMapping("/create")
    public ResponseEntity<?> createResponse(@RequestBody Response response) {
        boolean success = false;

        try {
            success = service.createResponse(response);
        } catch (Exception e) {
            System.err.println("response was null");
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Response>(
                response,
                success ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getResponsePageByQuery(
            @RequestParam String field,
            @RequestParam String value,
            @RequestParam String page,
            @RequestParam String size,
            @RequestParam String direction) {

        System.out.println(size);

        Pageable pageable = PageRequest
                .of(Integer.parseInt(page), Integer.parseInt(size))
                .withSort(direction.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC, field);
        Page<Response> result;

        try {
            result = service.getResponsePageByQuery(field, value, pageable);
        } catch (Exception e) {
            System.err.println("result was null");
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<Page<Response>>(
                result,
                result != null ? HttpStatus.CREATED : HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("")
    public String testEndpoint() {
        return "Endpoint successfully reached";
    }
}
