import { Component, OnInit } from '@angular/core';

import {ServerCommunicationService} from '../server-communication.service'

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  constructor(private service: ServerCommunicationService) { }

  ngOnInit() {
    this.service.reqEmpList();
  }

  getEmpList() {
    return this.service.getEmpList();
  }

  onEmployeeId(id: string) {
    this.service.employee_id = id;
  }
}
