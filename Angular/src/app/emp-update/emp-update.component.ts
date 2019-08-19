import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-emp-update',
  templateUrl: './emp-update.component.html',
  styleUrls: ['./emp-update.component.css']
})
export class EmpUpdateComponent implements OnInit {
  updForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.updForm = this.fb.group({
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
  }

  onSubmit() {
    let result = this.updForm.value;
    JSON.stringify(result);
  }
}
