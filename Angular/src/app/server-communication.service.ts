import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Master, EmpList, EmpDetail } from './receive-json-model';
import { DisplayItemService } from './display-item.service';

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
    private router: Router,
    private displayItem: DisplayItemService
  ) {}

  //マスタデータ取得
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
    this.client.get(sendUrl).subscribe((result: Master) => {
      this.BranchList['branchIdList'] = result.branch_dictionary['branch_id_list'];
      this.BranchList['branchNameList'] = result.branch_dictionary['branch_name_list'];
      this.DepartmentList['departmentIdList'] = result.department_dictionary['department_id_list'];
      this.DepartmentList['departmentNameList'] = result.department_dictionary['department_name_list'];
      
      this.displayItem.deviceList = result.device_list;
      this.displayItem.osList = result.os_list;
      this.displayItem.cpuList = result.cpu_list;
      this.displayItem.memoryList = result.memory_list;
      this.displayItem.storageTypeList = result.storage_type_list;
      this.displayItem.storageCapacityList = result.storage_capacity_list;
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
      switch (result['empType']) {
        case 'list':
          console.log(this.displayEmpList)
          this.displayEmpList = [{id: '', name: '', date: ''}];
          for (let index in result['empList']['idList']) {
            this.displayEmpList[index] = {
              id: result['empList']['idList'][index]
              , name: result['empList']['nameList'][index]
              , date: result['empList']['dateList'][index]
            };
          }
          console.log(this.displayEmpList)
          break;
        case 'detail':
          this.employee_id = result['employeeId']
          this.router.navigate(['/emp-detail']);
          break;
      }
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



  // 貸出情報取得（一覧）
  reqResList() {
    var sendUrl = '/api/resource_list';
    this.client.get(sendUrl).subscribe((results) => {
      for(let index in results['rental_device_id_list']) {
        this.displayItem.rentalInfoList[index] = {
          rental_device_id: results['rental_device_id_list'][index]
          , device_id: results['device_id_list'][index]
          , os_id: results['os_id_list'][index]
          , cpu_id: results['cpu_id_list'][index]
          , memory_id: results['memory_id_list'][index]
          , storage_type_id: results['storage_type_id_list'][index]
          , storage_capacity_id: results['storage_capacity_id_list'][index]
          , employee_id: results['employee_id_list'][index]
          , rental_start_date: results['rental_start_date_list'][index]
          , rental_end_date: results['rental_end_date_list'][index]
        };
      }
    });
  }

  // 貸出機器追加
  reqResInsert(insForm) {
    let sendUrl = '/api/resource_insert';
    let body = JSON.stringify(insForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.reqResList();
          this.router.navigate(['/res-list']);
          break;
      }
    });
  }

  // 貸出機器更新
  reqResUpdate(updForm) {
    let sendUrl = '/api/resource_update';
    let body = JSON.stringify(updForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.reqResList();
          this.router.navigate(['/res-list']);
      }
    });

  }

  // 貸出機器削除（論理削除）
  reqResDelete(rentalDeviceId) {
    let sendUrl = '/api/resource_delete/' + rentalDeviceId;
    this.client.delete(sendUrl, http_options).subscribe(() => {
      console.log('削除完了');
    });
  }
}


