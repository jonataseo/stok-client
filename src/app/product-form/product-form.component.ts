import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product = {} as Product;
  products: Product[];
  productId: number;

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get("id"));
    if(this.productId > 0) {
      this.productService.getProductById(this.productId).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }

  //define if a new product is create or is a update
  saveProduct(form: NgForm) {
    if(this.product.id !== undefined) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.productService.saveProduct(this.product).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }


  //clean the form
  cleanForm(form: NgForm) {
    form.resetForm();
    this.product = {} as Product;
  }
}
