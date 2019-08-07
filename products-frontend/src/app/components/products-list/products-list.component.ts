import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.subscription = this.productsService.productsChanged
      .subscribe(products => {
        this.products = products;
      });

    this.products = this.productsService.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
