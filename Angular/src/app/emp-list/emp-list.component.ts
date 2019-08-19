import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// 従業員一覧画面
class EmpList {
  employee_id_list: string[];//従業員ID
  jpns_name_list: string[];//従業員名
  join_date_list: string[];//入社年月日
}

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {


  constructor(private client: HttpClient) { }

  ngOnInit() {
    let sendUrl = 'http://192.168.33.11:8080/employee_list';
    this.client.get(sendUrl)
    .subscribe((result) => {
      console.log(result);
    })
  }


}
