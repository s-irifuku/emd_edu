import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ServerCommunicationService } from '../server-communication.service'

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
    // 検索フォーム作成
    this.searchForm = this.fb.group({
      jpnsName: [''],
      prefecture: ['', [Validators.pattern('^.+?[都道府県]$')]],
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

  get prefecture() { return this.searchForm.get('prefecture'); }  

  getEmpList() {
    return this.service.getEmpList();
  }

  onEmployeeId(id: string) {
    this.service.employee_id = id;
  }

  onSubmit() {
    if(!this.searchForm.invalid) {
      this.service.reqEmpSearch(this.searchForm);
    }
  }
}
