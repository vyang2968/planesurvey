package com.survey.handler;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.search.FuzzySearchOptions;
import com.mongodb.client.model.search.SearchOperator;
import com.mongodb.client.model.search.SearchPath;

@Repository
public class ResponseRepositoryImpl implements ResponseRepository {
    private static final int MIN_STARS = 5;
    @Autowired
    private MongoTemplate template;

    @Value("${spring.data.mongodb.database}")
    private String collectionName;

    @Override
    public boolean createResponse(Response response) {
        Response returned = template.save(response);
        return returned.getId() != null;
    }

    @Override
    public Page<Response> getAllResponsesOfQuery(String field, String value, Pageable pageable) {
        MongoCollection<Document> collection = template.getCollection(collectionName); // setup connections

        // search queries for this autosearch thingy
        List<Bson> searchPipeline = Arrays.asList(
                Aggregates.search(
                        SearchOperator.autocomplete(
                                SearchPath.fieldPath(field),
                                List.of(value))
                                .fuzzy(FuzzySearchOptions.fuzzySearchOptions()
                                        .maxEdits(1).prefixLength(1))),
                Aggregates.sort(
                        pageable.getSort().getOrderFor(field).getDirection()
                                .equals(Direction.ASC)
                                        ? Sorts.ascending(field)
                                        : Sorts.descending(field)),
                Aggregates.skip(pageable.getPageNumber() * pageable.getPageSize()), // pagination
                // function
                Aggregates.limit(pageable.getPageSize())); // limit to only the desired page size

        AggregateIterable<Document> aggregateResults = collection.aggregate(searchPipeline);
        List<Response> responses = new ArrayList<>();
        aggregateResults.forEach(document -> {
            Response response = new Response(
                    (ObjectId) document.get("_id"),
                    document.getString("firstName"),
                    obfuscateLastName(document.getString("lastName")),
                    obfuscateEmail(document.getString("email")),
                    document.getInteger("age"),
                    document.getString("manufacturer"),
                    document.getString("airplane"),
                    document.getList("airlines", String.class),
                    document.getString("response"));
            responses.add(response);
        });

        List<Bson> countPipeline = Arrays.asList(
                Aggregates.search(
                        SearchOperator.autocomplete(
                                SearchPath.fieldPath(field),
                                value).fuzzy(
                                        FuzzySearchOptions.fuzzySearchOptions()
                                                .maxEdits(1)
                                                .prefixLength(1))),
                Aggregates.count("totalCount"));

        Document result = collection.aggregate(countPipeline).first();

        Integer totalCount = result != null ? result.getInteger("totalCount") : 0;

        return new PageImpl<Response>(responses, pageable, totalCount);
    }

    public Page<Response> getAllResponses(String field, Pageable pageable) {
        Query query = Query.query(
                Criteria.where(field).exists(true)).with(pageable);

        List<Response> list = template.find(query, Response.class);
        list.forEach(
                (response) -> {
                    response.setEmail(obfuscateEmail(response.getEmail()));
                    response.setLastName(obfuscateLastName(response.getLastName()));
                });

        return PageableExecutionUtils.getPage(
                list,
                pageable,
                () -> template.count(Query.query(Criteria.where(field).exists(true)), Response.class));
    }

    private String obfuscateEmail(String email) {
        int symbolIndex = email.indexOf("@");
        String local = email.substring(0, symbolIndex);
        String domain = email.substring(symbolIndex, email.length() - 1);
        int randomLength = (int) (Math.random() * local.length());

        String stars = "*".repeat(randomLength > MIN_STARS ? randomLength : MIN_STARS);

        return email.substring(0, 1).concat(stars).concat(domain);
    }

    private String obfuscateLastName(String lastName) {
        String stars = "*".repeat(lastName.length() - 1);
        return lastName.substring(0, 1).concat(stars);
    }
}
