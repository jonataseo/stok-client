import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../services/client.service';
import { NgForm } from '@angular/forms';
import { Client } from '../models/client';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  client = {} as Client;
  clients: Client[];
  clientId: number;
  constructor(private clientService: ClientService, private route: ActivatedRoute,
      private router: Router) { }

  ngOnInit(){
    this.clientId = Number(this.route.snapshot.paramMap.get("id"));
    this.clientService.getClientById(this.clientId).subscribe((client: Client) => {
      this.client = client;
    })
  }


  //define if a new client is create or is a update
  saveClient(form: NgForm) {
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

  //Clean the form
  cleanForm(form: NgForm) {
    form.resetForm();
    this.client = {} as Client;
  }

}
