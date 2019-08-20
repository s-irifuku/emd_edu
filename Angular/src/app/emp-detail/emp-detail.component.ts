import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ServerCommunicationService} from '../server-communication.service'
@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit {

  constructor(private router:Router, private service: ServerCommunicationService) { }

  ngOnInit() {
    this.service.reqEmpDetail();
  }

  getEmpDetail() {
    return this.service.getEmpDetail();
  }

  goList() {
    this.service.employee_id = '';
    this.router.navigate(['emp-list']);
  }
}
