import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  id: string;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.product = this.productsService.getProductById(params['id']);
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    if (confirm('Are you sure want to delete?')) {
      this.dataStorageService.deleteProduct(this.id);
      // this.productsService.deleteProduct(this.id);
      this.router.navigate(['/products']);
    }
  }
}
