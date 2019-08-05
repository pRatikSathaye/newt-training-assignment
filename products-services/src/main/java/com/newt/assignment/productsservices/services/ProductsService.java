package com.newt.assignment.productsservices.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

import com.mongodb.MongoClient;
import com.mongodb.client.result.UpdateResult;
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

	public Product addNewProduct(Product productData) {
		return productDao.save(productData);
	}

	public UpdateResult updateProduct(String productId, Product productData) {
		MongoOperations ops = new MongoTemplate(new SimpleMongoDbFactory(new MongoClient(), "products-db"));
		Update update = new Update();
		update.set("description", productData.getDescription());
		update.set("price", productData.getPrice());
		return ops.updateFirst(query(where("_id").is(productId)), update, Product.class);
	}

	public void deleteProduct(String productId) {
		productDao.deleteById(productId);
	}
}
