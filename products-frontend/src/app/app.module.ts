import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductItemComponent } from './components/products-list/product-item/product-item.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductsResolver } from './services/products-resolver.service';

const appRoutes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent, resolve: [ProductsResolver] },
  { path: 'products/new', component: ProductEditComponent },
  { path: 'products/:id', component: ProductDetailComponent, resolve: [ProductsResolver] },
  { path: 'products/:id/edit', component: ProductEditComponent, resolve: [ProductsResolver] }
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductsListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ProductEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
