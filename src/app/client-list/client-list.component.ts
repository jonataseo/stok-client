import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  client = {} as Client;
  clients: Client[];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.getClients();
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

}
