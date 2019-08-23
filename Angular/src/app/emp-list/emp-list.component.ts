import { Component, OnInit } from '@angular/core';

import {ServerCommunicationService} from '../server-communication.service'
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServerCommunicationService
  ) { }

  ngOnInit() {
    // 従業員情報取得（一覧）
    this.service.reqEmpList();

    this.searchForm = this.fb.group({
      jpnsName: [''],
      address: [''],
      overAge: [''],
      underAge: [''],
      joinYear: [''],
      joinMonth: [''],
      joinDate: [''],
      seniority: [''],
      finalEducation: [''],
      employeeId: ['']
    })
  }

  get joinYear() { return this.searchForm.get('joinYear'); }
  get joinMonth() { return this.searchForm.get('joinMonth'); }
  

  getEmpList() {
    return this.service.getEmpList();
  }

  onEmployeeId(id: string) {
    this.service.employee_id = id;
  }

  onSubmit() {
    //if(!this.searchForm.invalid) {
    //this.service.reqEmpSearch(this.searchForm);
    //}
  }
}
