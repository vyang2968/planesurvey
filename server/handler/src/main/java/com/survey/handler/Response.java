package com.survey.handler;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import io.micrometer.common.lang.NonNullFields;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "responses")
public class Response {
    @Id
    @Generated
    private ObjectId id;

    private String firstName;
    private String lastName;
    private String email;
    private Integer age;
    private String manufacturer;
    private String airplane;
    private List<String> airlines;
    private String response;
}
