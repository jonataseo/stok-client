import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = 'http://127.0.0.1:8000/api/clients/';

  //injecting HttpClient
  constructor(private httpClient: HttpClient) { }

  //Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  //Get all clients
  getClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //Get client by id
  getClientById(id: number): Observable<Client> {
    return this.httpClient.get<Client>(this.url + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  //New Client
  saveClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(this.url, JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  //update client
  updateClient(client: Client): Observable<Client> {
    return this.httpClient.put<Client>(this.url + client.id + '/', JSON.stringify(client), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  //delete client
  deleteClient(client: Client) {
    return this.httpClient.delete<Client>(this.url + client.id, this.httpOptions)
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
}
