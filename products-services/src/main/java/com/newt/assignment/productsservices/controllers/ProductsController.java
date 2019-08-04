package com.newt.assignment.productsservices.controllers;

import java.util.List;
import java.util.Optional;

import org.jboss.logging.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.newt.assignment.productsservices.model.Product;
import com.newt.assignment.productsservices.services.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

	@Autowired
	private ProductsService productService;
	
	@GetMapping("/getAllProducts")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	@GetMapping("/getProductById/{productId}")
	public Optional<Product> getProductById(@PathVariable String productId ) {
		System.out.println("ProductID" + productId);
		return productService.getProductById(productId);
	}
}
