import { Injectable, ɵCodegenComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Master, EmpList, EmpDetail } from './receive-json-model';
import { send } from 'q';

const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {

  constructor(
    private client: HttpClient,
    private router: Router
  ) {}

  //マスタデータ取得（支店、部署）
  private BranchList: {}[] = [{
    branchIdList: ''
    , branchNameList: ''
  }];
  private DepartmentList: {}[] = [{
    departmentIdList: ''
    , departmentNameList: ''
  }];
  reqMaster() {
    var sendUrl = '/api/master';
    this.client.get(sendUrl).subscribe((results: Master) => {
      this.BranchList['branchIdList'] = results.branch_dictionary['branch_id_list'];
      this.BranchList['branchNameList'] = results.branch_dictionary['branch_name_list'];
      this.DepartmentList['departmentIdList'] = results.department_dictionary['department_id_list'];
      this.DepartmentList['departmentNameList'] = results.department_dictionary['department_name_list'];
    });
  }
  //【表示用】[(支店ID,支店名)]形式で返す
  getDisplayBranchList() {
    var displayBranchList: {}[] = [{
      id: ''
      , name: ''
    }];
    for(let index in this.BranchList['branchIdList']) {
      displayBranchList[index] = {
        id: this.BranchList['branchIdList'][index],
        name: this.BranchList['branchNameList'][index]
      };
    }
    return displayBranchList;
  }
  //【表示用】[(部署ID,部署名)]形式で返す
  getDisplayDepartmentList() {
    var displayDepartmentList: {}[] = [{
      id: ''
      , name: ''
    }];
    for(let index in this.DepartmentList['departmentIdList']) {
      displayDepartmentList[index] = {
        id: this.DepartmentList['departmentIdList'][index],
        name: this.DepartmentList['departmentNameList'][index]
      };
    }
    return displayDepartmentList;
  }

  // 従業員情報取得（一覧）
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

  //コンポーネント間で使用する従業員ID
  employee_id = '';

  // 従業員情報取得（個別）
  private empDetail: EmpDetail = new EmpDetail();
  reqEmpDetail() {
    let sendUrl = '/api/employee_detail/' + this.employee_id;
    this.client.get(sendUrl).subscribe((result: EmpDetail) => {
      this.empDetail = result;
    });    
  }
  getEmpDetail() {
    return this.empDetail;
  }

  // 従業員情報検索
  reqEmpSearch(searchForm) {
    let sendUrl = '/api/employee_search';
    let body = JSON.stringify(searchForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      
    })

  }



  // 従業員情報更新
  updateErrorMessage = '';
  reqEmpUpdate(updForm) {
    let sendUrl = '/api/employee_update';
    let body = JSON.stringify(updForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.updateErrorMessage = '';
          this.reqEmpList();
          this.router.navigate(['/emp-list']);
          break;
        case 'NG':
          this.updateErrorMessage = result['msg'];
      }
    });
  }

  // 従業員情報追加
  insertErrorMessage = '';
  reqEmpInsert(insForm) {
    let sendUrl = '/api/employee_insert';
    let body = JSON.stringify(insForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.insertErrorMessage = '';
          this.reqEmpList();
          this.router.navigate(['/emp-list']);
          break;
        case 'NG':
          this.insertErrorMessage = result['msg'];
      }
    });
  }

  // 従業員情報削除
  reqEmpDelete() {
    let sendUrl = '/api/employee_delete/' + this.employee_id;
    this.client.delete(sendUrl, http_options).subscribe(() => {
      console.log('削除完了');
    });
  }
}
