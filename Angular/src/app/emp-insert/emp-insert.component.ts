import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'

import {ServerCommunicationService} from '../server-communication.service'

@Component({
  selector: 'app-emp-insert',
  templateUrl: './emp-insert.component.html',
  styleUrls: ['./emp-insert.component.css']
})
export class EmpInsertComponent implements OnInit {
  insForm: FormGroup;
  branchList = [];
  departmentList = [];

  constructor(
    private fb: FormBuilder,
    private service: ServerCommunicationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.insForm = this.fb.group({
      jpns_name: [''],
      jpns_kana: [''],
      roma_name: [''],
      sex: [''],
      birth_date: [''],
      postal_code: [''],
      address: [''],
      tel_no: [''],
      mail_address: [''],
      final_education: [''],
      division: [''],
      employee_id: [''],
      join_date: [''],
      company_mail_address: [''],
      photo_image: [''],
      branch_id: [''],
      department_id: ['']
    });
    this.branchList = this.service.getDisplayBranchList();
    this.departmentList = this.service.getDisplayDepartmentList();
  }

  onSubmit() {
    this.service.reqEmpInsert(this.insForm);
    this.service.reqEmpList();
    this.router.navigate(['/emp-list']);
  }
}
