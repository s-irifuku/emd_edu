import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmpUpdateComponent } from './emp-update/emp-update.component';

import { BranchList, DepartmentList, EmpList, EmpDetail } from './receive-json-model';

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {
  //コンポーネント間で使用する従業員ID
  employee_id = '';

  constructor(private client: HttpClient) {}

  //マスタデータ取得
  private BranchList: {}[] = [{
    branchId: ''
    , branchName: ''
  }]




  // 一覧
  private displayEmpList: {}[] = [{
    id: ''
    , name: ''
    , date: ''
  }];

  reqEmpList() {
    var sendUrl = '/api/employee_list';
    this.client.get(sendUrl).subscribe((results: EmpList) => {
      for(let index in results.idList) {
        this.displayEmpList[index] = {
          id: results.idList[index]
          , name: results.nameList[index]
          , date: results.dateList[index]
        };
      }
    });
  }
  getEmpList() {
    return this.displayEmpList;
  }

  //詳細
  private empDetail: EmpDetail = new EmpDetail();
  reqEmpDetail() {
    var sendUrl = '/api/employee_detail/' + this.employee_id;
    this.client.get(sendUrl).subscribe((result: EmpDetail) => {
      this.empDetail = result;
      console.log(this.empDetail);
    });    
  }
  getEmpDetail() {
    return this.empDetail;
  }

}
