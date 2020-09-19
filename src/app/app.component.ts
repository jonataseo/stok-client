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

    // client = {} as Client;
    // clients: Client[];

    constructor(private clientService: ClientService) {}

    ngOnInit(): void {

    }

}
