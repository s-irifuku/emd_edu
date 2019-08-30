import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ServerCommunicationService } from '../server-communication.service'
import { DisplayItemService } from '../display-item.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  // 検索フォーム
  searchForm: FormGroup;

  constructor(
    private fb: FormBuilder
    , private itemService: DisplayItemService
    , private serverService: ServerCommunicationService
  ) { }

  // コンポーネント表示前処理
  ngOnInit() {
    // 従業員一覧取得
    this.serverService.reqEmpList();
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

  // 詳細情報を表示する従業員IDをサービスに設定する。
  onEmployeeId(id: string) {
    this.itemService.employee_id = id;
  }

  onSubmit() {
    if(!this.searchForm.invalid) {
      this.serverService.reqEmpSearch(this.searchForm);
    }
  }
}
