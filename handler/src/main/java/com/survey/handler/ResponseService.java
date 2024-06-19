package com.survey.handler;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.TextSearchOptions;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {
  @Autowired private ResponseRepository repository;

  @Autowired private MongoTemplate template;

  public Response createResponse(Response response) {
    Response created = repository.insert(response);

    return created;
  }

  public List<String> getAllQueryResults(String query, String sortby, String order) {
    MongoCollection<Document> collection = template.getCollection("response");
    collection.createIndex(sortby != null ? Indexes.text(sortby) : Indexes.text());

    TextSearchOptions options = new TextSearchOptions().caseSensitive(false);
    Bson filter = Filters.text(query, options);

    List<String> responses = new ArrayList<>();
    collection
        .find(filter)
        .sort((order.equals("up") ? Sorts.ascending(sortby) : Sorts.descending(sortby)))
        .forEach(result -> responses.add(result.toJson()));

    return responses;
  }
}
