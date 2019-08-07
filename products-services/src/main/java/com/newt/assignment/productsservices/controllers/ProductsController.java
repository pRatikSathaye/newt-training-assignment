package com.newt.assignment.productsservices.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.result.UpdateResult;
import com.newt.assignment.productsservices.model.Product;
import com.newt.assignment.productsservices.services.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductsController {

	@Autowired
	private ProductsService productService;
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/getAllProducts")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@GetMapping("/getProductById/{productId}")
	public Optional<Product> getProductById(@Valid @PathVariable String productId ) {
		return productService.getProductById(productId);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/addProduct")
	public Product addNewProduct(@Valid @RequestBody Product productData) {
		return productService.addNewProduct(productData);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@PutMapping("/updateProduct/{productId}")
	public UpdateResult updateProduct(@Valid @PathVariable String productId, @Valid @RequestBody Product productData) {
		return productService.updateProduct(productId, productData);
	}

	@CrossOrigin(origins = "http://localhost:4200")
	@DeleteMapping("/deleteProductById/{productId}")
	public void deleteProductById(@Valid @PathVariable String productId) {
		productService.deleteProduct(productId);
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public Map<String, Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
		Map<String, Map<String, String>> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError)error).getField();
			String errorMessage = error.getDefaultMessage();
			Map<String, String> errorDetails = new HashMap<>();
			errorDetails.put("field", fieldName);
			errorDetails.put("code", error.getCode());
			errorDetails.put("message", error.getDefaultMessage());
			errors.put(fieldName, errorDetails);
			System.out.println("FieldName:" + fieldName + " error Message:" + errorMessage);
		});

		return errors;
	}
}
