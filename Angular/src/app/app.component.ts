import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ServerCommunicationService} from './server-communication.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private service: ServerCommunicationService
  ) { }

  ngOnInit() {
    //マスタデータ読込
    this.service.reqMaster();
    //初期表示
    this.router.navigate(['emp-list']);
  }

}
