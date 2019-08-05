package com.newt.assignment.productsservices.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.newt.assignment.productsservices.model.Product;

@Repository
public interface ProductDao extends MongoRepository<Product, String> {
 
	public List<Product> findAll();
	
	public Optional<Product> findById(String productId);

	public Product insert(Product productData);

	public Product save(Product productData);

	public void deleteById(String productId);
}
