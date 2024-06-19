package com.survey.handler;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/")
public class ResponseController {
  @Autowired private ResponseService service;

  @GetMapping("")
  public String home() {
    return "index";
  }

  @GetMapping("submitted")
  public String submitted() {
    return "submitted";
  }

  @GetMapping("search")
  public String search() {
    return "search";
  }

  @GetMapping("error")
  public String error() {
    return "error";
  }

  @PostMapping("submission")
  public ResponseEntity<String> createResponse(@ModelAttribute Response response) {
    try {
      System.out.println(response.toString());
      service.createResponse(response);
      return new ResponseEntity<String>(HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
    }
  }

  @GetMapping("search/fields")
  public ResponseEntity<String[]> getResponseFields() {
    return new ResponseEntity<String[]>(Response.getFields(), HttpStatus.OK);
  }

  @GetMapping("search/responses")
  public ResponseEntity<List<String>> getResponses(
      @RequestParam("query") String query,
      @RequestParam("sortby") String sortby,
      @RequestParam("order") String order) {
    query = URLDecoder.decode(query, StandardCharsets.UTF_8);
    sortby = URLDecoder.decode(sortby, StandardCharsets.UTF_8);
    order = URLDecoder.decode(order, StandardCharsets.UTF_8);

    List<String> responses = service.getAllQueryResults(query, sortby, order);
    System.out.printf("%s, %s, %s%n", query, sortby, order);
    return new ResponseEntity<List<String>>(responses, HttpStatus.OK);
  }
}
