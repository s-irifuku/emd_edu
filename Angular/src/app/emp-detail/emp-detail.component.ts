import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {ServerCommunicationService} from '../server-communication.service'
import { EmpDetail } from '../receive-json-model';
import { DisplayItemService } from '../display-item.service';
@Component({
  selector: 'app-emp-detail',
  templateUrl: './emp-detail.component.html',
  styleUrls: ['./emp-detail.component.css']
})
export class EmpDetailComponent implements OnInit {

  constructor(
    private router:Router
    , private itemService: DisplayItemService
    , private serverService: ServerCommunicationService
  ) { }

  ngOnInit() {
    this.serverService.reqEmpDetail();
  }

  // 一覧画面へ戻る
  goList() {
    this.itemService.employee_id = '';
    this.router.navigate(['/emp-list']);
  }

  // 削除する。
  goDelete() {
    this.serverService.reqEmpDelete();
    this.itemService.employee_id = '';
    this.router.navigate(['/emp-list']);
  }
}
