import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';
import { Client } from './models/client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    client = {} as Client;
    clients: Client[];

    constructor(private clientService: ClientService) {}

    ngOnInit() {
      this.getClients();
    }

    //define if a new client is create or is a update
    saveClient(form: NgForm){
      if(this.client.id !== undefined) {
        this.clientService.updateClient(this.client).subscribe(() => {
          this.cleanForm(form);
        });
      } else {
        this.clientService.saveClient(this.client).subscribe(() => {
          this.cleanForm(form);
        });
      }
    }

    //Call the service for get all clients
    getClients() {
      this.clientService.getClients().subscribe((clients: Client[]) => {
        this.clients = clients;
      });
    }

    //delete a client
    deleteClient(client: Client) {
      this.clientService.deleteClient(client).subscribe(() => {
        this.getClients();
      });
    }

    //copy a client to edit
    editClient(client: Client) {
      this.client = { ...client };
    }

    //Clean the form
    cleanForm(form: NgForm) {
      this.getClients();
      form.resetForm();
      this.client = {} as Client;
    }
}
