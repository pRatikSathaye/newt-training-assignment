package com.newt.assignment.productsservices.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection = "products")
public class Product {

	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	private String _id;

	private String name;
	private String description;
	private String category;
	private Float price;
	private String currency;
	private List<String> images;
	private String warrantyDetails;
	private String units;
	public String get_id() {
		return _id;
	}
	public String getName() {
		return name;
	}
	public String getDescription() {
		return description;
	}
	public String getCategory() {
		return category;
	}
	public Float getPrice() {
		return price;
	}
	public String getCurrency() {
		return currency;
	}
	public List<String> getImages() {
		return images;
	}
	public String getWarrantyDetails() {
		return warrantyDetails;
	}
	public String getUnits() {
		return units;
	}
	
}
