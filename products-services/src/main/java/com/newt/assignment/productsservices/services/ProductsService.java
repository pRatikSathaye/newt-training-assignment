package com.newt.assignment.productsservices.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.newt.assignment.productsservices.dao.ProductDao;
import com.newt.assignment.productsservices.model.Product;

@Service
public class ProductsService {
	
	@Autowired
	private ProductDao productDao;
	
	public List<Product> getAllProducts() {
		return productDao.findAll();
	}

	public Optional<Product> getProductById(String productId) {
		return productDao.findById(productId);
	}
}
