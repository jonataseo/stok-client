import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Sale } from '../models/sale';
import { SaleService } from '../services/sale.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {

  sale = {} as Sale;
  sales: Sale[];

  constructor(private saleService: SaleService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }


  //define if a new sale is created or is a update
  saveSale(form: NgForm) {
    if(this.sale.id !== undefined) {
      this.saleService.updateSale(this.sale).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.saleService.saveSale(this.sale).subscribe(() => {
        this.cleanForm(form);
      })
    }
  }

  //clean the form
  cleanForm(form: NgForm) {
    form.resetForm();
    this.sale = {} as Sale;
  }
}
