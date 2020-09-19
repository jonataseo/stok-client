import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { ClientService } from '../services/client.service';
import { Client } from '../models/client';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  client = {} as Client;
  clients: Client[];
  searchClient;
  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.getClients();
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0,0);
    });
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
