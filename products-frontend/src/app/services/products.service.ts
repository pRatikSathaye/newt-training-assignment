import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  products: Product[] = [
    new Product(
      '1',
      'Redmi Note 7',
      'A device with good specs',
      'Electronics',
      14999,
      'Rs',
      [],
      'The manufacturer is providing 1 year of warranty',
      '1'
    ),
    new Product(
      '2',
      'One Plus 7',
      'A device with latest specs and blazing fast',
      'Electronics',
      32999,
      'Rs',
      [],
      'The manufacturer is providing 1 year of warranty',
      '1'
    ),
  ];

  getProducts() {
    return this.products;
  }
}
