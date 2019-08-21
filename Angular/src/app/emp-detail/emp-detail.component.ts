import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ServerCommunicationService} from '../server-communication.service'
import { EmpDetail } from '../receive-json-model';
@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit {
  branchList = [];
  departmentList = [];

  constructor(private router:Router, private service: ServerCommunicationService) { }

  ngOnInit() {
    this.service.reqEmpDetail();
    this.branchList = this.service.getDisplayBranchList();
    this.departmentList = this.service.getDisplayDepartmentList();
  }

  getEmpDetail() {
    return this.service.getEmpDetail();
  }

  goList() {
    this.service.employee_id = '';
    this.router.navigate(['/emp-list']);
  }

  goDelete() {
    this.service.reqEmpDelete();
    this.service.employee_id = '';
    this.router.navigate(['/emp-list']);
  }
}
