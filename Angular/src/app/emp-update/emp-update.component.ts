import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

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
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // 詳細情報を初期値に設定したフォーム作成
    var empDetail = this.service.getEmpDetail();
    this.updForm = this.fb.group({
      jpnsName: [empDetail.jpnsName, [Validators.required]],
      jpnsKana: [empDetail.jpnsKana, [Validators.required]],
      romaName: [empDetail.romaName, [Validators.required, Validators.pattern('^[a-z]+? {1}[a-z]+?$')]],
      sex: [empDetail.sex, [Validators.required]],
      birthDate: [empDetail.birthDate, [Validators.required, Validators.pattern('^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')]],
      postalCode: [empDetail.postalCode, [Validators.required, Validators.pattern('^[0-9]{3}[-]{1}[0-9]{4}$')]],
      address: [empDetail.address, [Validators.required]],
      telNo: [empDetail.telNo, [Validators.required, Validators.pattern('^[0-9]+?[-]{1}[0-9]+?[-]{1}[0-9]+?$')]],
      mailAddress: [empDetail.mailAddress, [Validators.required, Validators.pattern('^[a-z]+[@]{1}[a-z]+[.]{1}[a-z]+$')]],
      finalEducation: [empDetail.finalEducation, [Validators.required]],
      educationDivision: [empDetail.educationDivision, [Validators.required]],
      joinDate: [empDetail.joinDate, [Validators.required, Validators.pattern('^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')]],
      employeeId: [empDetail.employeeId],
      companyMailAddress: [empDetail.companyMailAddress, [Validators.required, Validators.pattern('^[a-z-]+[@]{1}(tky|sdi|ngy)[.]{1}emdes.co.jp$')]],
      photoImage: [empDetail.photoImage],
      branchId: [empDetail.branchId, [Validators.required]],
      departmentId: [empDetail.departmentId, [Validators.required]]
    });
    this.branchList = this.service.getDisplayBranchList();
    this.departmentList = this.service.getDisplayDepartmentList();
  }

  get jpnsName() { return this.updForm.get('jpnsName'); }
  get jpnsKana() { return this.updForm.get('jpnsKana'); }
  get romaName() { return this.updForm.get('romaName'); }
  get sex() { return this.updForm.get('sex'); }
  get birthDate() { return this.updForm.get('birthDate'); }
  get postalCode() { return this.updForm.get('postalCode'); }
  get address() { return this.updForm.get('address'); }
  get telNo() { return this.updForm.get('telNo'); }
  get mailAddress() { return this.updForm.get('mailAddress'); }
  get finalEducation() { return this.updForm.get('finalEducation'); }
  get educationDivision() { return this.updForm.get('educationDivision'); }
  get joinDate() { return this.updForm.get('joinDate'); }
  get companyMailAddress() { return this.updForm.get('companyMailAddress'); }
  get photoImage() { return this.updForm.get('photoImage'); }
  get branchId() { return this.updForm.get('branchId'); }
  get departmentId() { return this.updForm.get('departmentId'); }

  onSubmit() {
    if (!this.updForm.invalid) {
      this.service.reqEmpUpdate(this.updForm);
    }
  }

  get errorMessage() {return this.service.updateErrorMessage;}

  onBack() {
    this.service.updateErrorMessage = '';
  }

}
