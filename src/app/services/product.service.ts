import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://127.0.0.1:8000/api/clients/';
  productId: number;

  //injecting HttpClient
  constructor(private httpClient: HttpClient) { }

  //Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Get all products
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Get product by id
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //New Product
  saveProduct(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(this.url, JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //update product
  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(this.url + product.id + '/', JSON.stringify(product), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //delete product
  deleteProduct(product: Product) {
    return this.httpClient.delete<Product>(this.url + product.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = error.error.message;
    } else {
      //Server side error
      errorMessage = `Codigo do erro: ${error.status}, ` + `mensagem: ${error.message}`
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  nextEditableProduct(productId: number){
    this.productId = productId;
  }
}
