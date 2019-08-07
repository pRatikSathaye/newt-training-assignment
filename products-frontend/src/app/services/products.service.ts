import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  productsChanged = new Subject<Product[]>();
  products: Product[] = [];
  // [
  //   new Product(
  //     '1',
  //     'Redmi Note 7',
  //     'A device with good specs',
  //     'Electronics',
  //     14999,
  //     'Rs',
  //     ['https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-7-1.jpg'],
  //     'The manufacturer is providing 1 year of warranty',
  //     '1'
  //   ),
  //   new Product(
  //     '2',
  //     'One Plus 7',
  //     'A device with latest specs and blazing fast',
  //     'Electronics',
  //     32999,
  //     'Rs',
  //     ['https://images-na.ssl-images-amazon.com/images/I/51-QMzEE0HL._SX569_.jpg'],
  //     'The manufacturer is providing 1 year of warranty',
  //     '1'
  //   ),
  // ];

  getProducts() {
    return this.products.slice();
  }

  setProducts(products: Product[]) {
    this.products = products;
    this.productsChanged.next(this.products.slice())
  }

  getProductById(id: string) {
    return this.products.find(product => id === product.getId());
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.productsChanged.next(this.products.slice());
  }

  updateProduct(id: string, product: Product) {
    let existingProduct = this.products.find(product => product.getId() === id);
    let index = this.products.indexOf(existingProduct);
    this.products[index] = product;
    this.productsChanged.next(this.products.slice());
  }

  deleteProduct(id: string) {
    let existingProduct = this.products.find(product => product.getId() === id);
    let index = this.products.indexOf(existingProduct);
    this.products.splice(index, 1);
    this.productsChanged.next(this.products.slice());
  }

}
