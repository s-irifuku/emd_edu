import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms'

import {ServerCommunicationService} from '../server-communication.service'


@Component({
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css']
})
export class EmpUpdateComponent implements OnInit {
  updForm: FormGroup;
  branchList = [];
  departmentList = [];

  constructor(
    private service: ServerCommunicationService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    // 詳細情報を初期値に設定したフォーム作成
    var empDetail = this.service.getEmpDetail();
    this.updForm = this.fb.group({
      jpnsName: [empDetail.jpnsName],
      jpnsKana: [empDetail.jpnsKana],
      romaName: [empDetail.romaName],
      sex: [empDetail.sex],
      birthDate: [empDetail.birthDate],
      postalCode: [empDetail.postalCode],
      address: [empDetail.address],
      telNo: [empDetail.telNo],
      mailAddress: [empDetail.mailAddress],
      finalEducation: [empDetail.finalEducation],
      division: [''],
      employeeId: [empDetail.employeeId],
      joinDate: [empDetail.joinDate],
      companyMailAddress: [empDetail.companyMailAddress],
      photoImage: [empDetail.photoImage],
      branchId: [empDetail.branchId],
      departmentId: [empDetail.departmentId]
    });
    this.branchList = this.service.getDisplayBranchList();
    this.departmentList = this.service.getDisplayDepartmentList();
  }

  onSubmit() {
    this.service.reqEmpUpdate(this.updForm);
    this.service.reqEmpList();
    this.router.navigate(['/emp-list']);
  }
}
