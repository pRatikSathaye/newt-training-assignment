import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('f', { static: false }) productEditForm: NgForm;
  errors: Object[] = null;
  id: string;
  product: Product;
  editMode: boolean = true;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private dataStorageService: DataStorageService
  ) {}

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    let totalRecords = this.productsService.getProducts().length;
    let values = form.value;
    let product = new Product(
      this.id ? this.id : null,
      values.name,
      values.description,
      values.category,
      values.price,
      values.currency,
      [values.images],
      values.warrantyDetails,
      values.units
    );
    if (this.editMode) {
      // Update the record
      this.dataStorageService.updateProduct(this.id, product);
      this.router.navigate(['..'], {relativeTo: this.route});

    } else {
      // Insert new record
      this.dataStorageService.addProduct(product)
      .subscribe(
        product => {
          this.productsService.addProduct(product);
          this.router.navigate(['/products']);
        },
        errorResponse => {
          if (Array.isArray(errorResponse.error)) {
            this.errors = errorResponse.error;

          } else {
            let errorsArr = [];
            for (const err in errorResponse.error) {
              if (errorResponse.error.hasOwnProperty(err)) {
                const element = errorResponse.error[err];
                errorsArr.push({ message: element.message});
              }
            }

            this.errors = errorsArr;
          }
        }
      );

    }
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (params['id']) {
        this.editMode = true;
        this.product = this.productsService.getProductById(params['id']);

      } else {
        this.editMode = false;
      }
    });
  }

  ngAfterViewInit() {
    if (this.product && this.productEditForm) {
      setTimeout(() => {
        this.productEditForm.setValue({
          name: this.product.getName(),
          description: this.product.getDescription(),
          category: this.product.getCategory(),
          units: this.product.getUnits(),
          currency: this.product.getCurrency(),
          warrantyDetails: this.product.getWarrantyDetails(),
          images: this.product.getImages()[0],
          price: this.product.getPrice()
        });
      });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
