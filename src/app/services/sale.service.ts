import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  url = 'http://127.0.0.1:8000/api/sales/';

  constructor(private httpClient: HttpClient) { }

  //Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  //Get all sales
  getSales(): Observable<Sale[]> {
    return this.httpClient.get<Sale[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Get sale by id
  getSaleById(id: number): Observable<Sale> {
    return this.httpClient.get<Sale>(this.url + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //New Sale
  saveSale(sale: Sale): Observable<Sale> {
    return this.httpClient.post<Sale>(this.url, JSON.stringify(sale), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Update Sale
  updateSale(sale: Sale): Observable<Sale> {
    return this.httpClient.put<Sale>(this.url + sale.id + '/', JSON.stringify, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError))
  }

  //Delete Sale
  deleteSale(sale: Sale): Observable<Sale> {
    return this.httpClient.delete<Sale>(this.url + sale.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError))
  }

  //Handle errors
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
}
