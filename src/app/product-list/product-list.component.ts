import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product = {} as Product;
  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  //Call the service to get all products
  getProducts() {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    })
  }

  //delete a product
  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.getProducts();
    });
  }

  //copy a product to edit
  editProduct(product: Product) {
    this.product = { ...product };
  }

}
