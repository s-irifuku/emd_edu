import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-emp-insert',
  templateUrl: './emp-insert.component.html',
  styleUrls: ['./emp-insert.component.css']
})
export class EmpInsertComponent implements OnInit {
  insForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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
  }

  onSubmit() {
    let result = this.insForm.value;
    JSON.stringify(result);
  }
}
