import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { ProductsService } from './products.service';
import { DataStorageService } from './data-storage.service';

@Injectable({ providedIn: 'root' })
export class ProductsResolver implements Resolve<Product[]> {
  constructor(
    private http: HttpClient,
    private dataStorageService: DataStorageService,
    private productsService: ProductsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> | Promise<Product[]> | Product[] {
    let products = this.productsService.getProducts();
    if (products.length <= 0)
       return this.dataStorageService.fetchProducts();
    else {
      return products;
    }
  }  
}