import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { ProductsService } from './products.service';

interface ProductJSON {
  _id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images: string[];
  warrantyDetails: string;
  units: string;
}

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private productsService: ProductsService) {}

  fetchProducts() {
    return this.http.get<ProductJSON[]>('http://localhost:8080/api/products/getAllProducts').pipe(
      map(products => {
        return products.map(product => {
          return new Product(
            product._id,
            product.name,
            product.description,
            product.category,
            product.price,
            product.currency,
            product.images,
            product.warrantyDetails,
            product.units
          );
        });
      }),
      tap(products => {
        this.productsService.setProducts(products);
      })
    );
  }

  addProduct(product: Product) {
    return this.http
      .post<ProductJSON>('http://localhost:8080/api/products/addProduct', product)
      .pipe(
        map(responseData => {
          let product = new Product(
            responseData._id,
            responseData.name,
            responseData.description,
            responseData.category,
            responseData.price,
            responseData.currency,
            responseData.images,
            responseData.warrantyDetails,
            responseData.units
          );
          return product;
        })
      )
  }

  updateProduct(id: string, productData: Product) {
    this.http.put<ProductJSON>(
      'http://localhost:8080/api/products/updateProduct/' + id,
      productData
    )
    .pipe(
      map(response => {
        return response;
      })
    )
    .subscribe(json => {
      let product = new Product(
        productData.getId(),
        productData.getName(),
        productData.getDescription(),
        productData.getCategory(),
        productData.getPrice(),
        productData.getCurrency(),
        productData.getImages(),
        productData.getWarrantyDetails(),
        productData.getUnits()
      );
      this.productsService.updateProduct(id, product);
    }) 
  }

  deleteProduct(id: string) {
    this.http.delete(
      'http://localhost:8080/api/products/deleteProductById/' + id
    )
    .subscribe(response => {
      this.productsService.deleteProduct(id);
    });
  }
}
