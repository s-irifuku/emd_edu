import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

import { ServerCommunicationService } from '../server-communication.service'

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
    private service: ServerCommunicationService
  ) { }

  ngOnInit() {
    this.insForm = this.fb.group({
      jpnsName: ['', [Validators.required]],
      jpnsKana: ['', [Validators.required]],
      romaName: ['', [Validators.required, Validators.pattern('^[a-z]+? {1}[a-z]+?$')]],
      sex: ['', [Validators.required]],
      birthDate: ['', [Validators.required, Validators.pattern('^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')]],
      postalCode: ['', [Validators.required, Validators.pattern('^[0-9]{3}[-]{1}[0-9]{4}$')]],
      address: ['', [Validators.required]],
      telNo: ['', [Validators.required, Validators.pattern('^[0-9]+?[-]{1}[0-9]+?[-]{1}[0-9]+?$')]],
      mailAddress: ['', [Validators.required, Validators.pattern('^[a-z]+[@]{1}[a-z]+[.]{1}[a-z]+$')]],
      finalEducation: ['', [Validators.required]],
      educationDivision: ['', [Validators.required]],
      joinDate: ['', [Validators.required, Validators.pattern('^[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}')]],
      photoImage: [''],
      branchId: ['', [Validators.required]],
      departmentId: ['', [Validators.required]]
    });
    this.branchList = this.service.getDisplayBranchList();
    this.departmentList = this.service.getDisplayDepartmentList();
  }

  get jpnsName() { return this.insForm.get('jpnsName'); }
  get jpnsKana() { return this.insForm.get('jpnsKana'); }
  get romaName() { return this.insForm.get('romaName'); }
  get sex() { return this.insForm.get('sex'); }
  get birthDate() { return this.insForm.get('birthDate'); }
  get postalCode() { return this.insForm.get('postalCode'); }
  get address() { return this.insForm.get('address'); }
  get telNo() { return this.insForm.get('telNo'); }
  get mailAddress() { return this.insForm.get('mailAddress'); }
  get finalEducation() { return this.insForm.get('finalEducation'); }
  get educationDivision() { return this.insForm.get('educationDivision'); }
  get joinDate() { return this.insForm.get('joinDate'); }
  get photoImage() { return this.insForm.get('photoImage'); }
  get branchId() { return this.insForm.get('branchId'); }
  get departmentId() { return this.insForm.get('departmentId'); }

  onSubmit() {
    if (!this.insForm.invalid) {
      this.service.reqEmpInsert(this.insForm);
    }
  }

  get errorMessage() {return this.service.insertErrorMessage;}

  onBack() {
    this.service.insertErrorMessage = '';
  }
}
