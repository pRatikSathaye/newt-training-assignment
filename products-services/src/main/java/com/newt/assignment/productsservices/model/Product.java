package com.newt.assignment.productsservices.model;

import java.util.List;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection = "products")
public class Product {

	@Id
	@JsonSerialize(using = ToStringSerializer.class)
	private String _id;

	@NotBlank(message = "Please enter product name.")
	private String name;

	@NotBlank(message = "Please enter product description.")
	private String description;

	@NotBlank(message = "Please specify product category")
	private String category;

	@NotNull(message = "Please provide price of the product")
	private Float price;

	@NotBlank(message = "Please provide currency for the product")
	private String currency;

	private List<String> images;

	private String warrantyDetails;

	@NotBlank(message = "Please provide product units")
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
