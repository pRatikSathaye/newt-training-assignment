import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onNavigate(productId: string) {
    this.router.navigate([productId], { relativeTo: this.route });
  }
}
