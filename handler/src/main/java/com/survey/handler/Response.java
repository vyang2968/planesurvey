package com.survey.handler;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.List;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
public class Response {
  @Id private ObjectId id;
  private String name;
  private String email;
  private Date date;
  private Integer age;
  private String manufacturer;
  private String dropdown;
  private List<String> favAirlines;
  private String experience;

  public Response(
      String name,
      String email,
      Date date,
      Integer age,
      String manufacturer,
      String dropdown,
      List<String> favAirlines,
      String experience) {
    this.name = name;
    this.email = email;
    this.date = date;
    this.age = age;
    this.manufacturer = manufacturer;
    this.dropdown = dropdown;
    this.favAirlines = favAirlines;
    this.experience = experience;
  }

  public static String[] getFields() {
    Field[] fields = Response.class.getDeclaredFields();
    String[] fieldNames = new String[fields.length];

    for (int i = 0; i < fields.length; i++) {
      fieldNames[i] = fields[i].getName();
    }

    return fieldNames;
  }

  @Override
  public String toString() {
    return String.format(
        "name: %s, email: %s, date: %s, age: %d, manufacturer: %s, dropdown: %s, favAirlines: %s,"
            + " experience: %s%n",
        name, email, date, age, manufacturer, dropdown, favAirlines, experience);
  }
}
