import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Master, EmpList, EmpDetail } from './receive-json-model';
import { DisplayItemService } from './display-item.service';

// JSON送信用のオプション
const http_options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// バックエンド通信サービス
@Injectable({
  providedIn: 'root'
})
export class ServerCommunicationService {

  constructor(
    private client: HttpClient,
    private router: Router,
    private itemService: DisplayItemService
  ) {}

  //マスタデータ取得
  reqMaster() {
    var sendUrl = '/api/master';
    this.client.get(sendUrl).subscribe((result: Master) => {      
      this.itemService.branchList = result.branch_list;
      this.itemService.departmentList = result.department_list;
      this.itemService.deviceList = result.device_list;
      this.itemService.osList = result.os_list;
      this.itemService.cpuList = result.cpu_list;
      this.itemService.memoryList = result.memory_list;
      this.itemService.storageTypeList = result.storage_type_list;
      this.itemService.storageCapacityList = result.storage_capacity_list;
    });
  }

  // 従業員一覧取得
  reqEmpList() {
    var sendUrl = '/api/employee_list';
    this.client.get(sendUrl).subscribe((results: EmpList) => {
      for(let index in results.idList) {
        this.itemService.empInfoList[index] = {
          id: results.idList[index]
          , name: results.nameList[index]
          , date: results.dateList[index]
        };
      }
    });
  }

  // 従業員情報取得（個別）
  reqEmpDetail() {
    var sendUrl = '/api/employee_detail/' + this.itemService.employee_id;
    this.client.get(sendUrl).subscribe((result: EmpDetail) => {
      this.itemService.empDetail = result;
    });
  }

  // 従業員詳細取得
  reqEmpSearch(searchForm) {
    var sendUrl = '/api/employee_search';
    var body = JSON.stringify(searchForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['empType']) {
        case 'list':
          this.itemService.empInfoList = [{id: '', name: '', date: ''}];
          for (let index in result['empList']['idList']) {
            this.itemService.empInfoList[index] = {
              id: result['empList']['idList'][index]
              , name: result['empList']['nameList'][index]
              , date: result['empList']['dateList'][index]
            };
          }
          break;
        case 'detail':
          this.itemService.employee_id = result['employeeId']
          this.router.navigate(['/emp-detail']);
          break;
      }
    })
  }

  // 従業員情報更新
  reqEmpUpdate(updForm) {
    var sendUrl = '/api/employee_update';
    var body = JSON.stringify(updForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.itemService.updateErrorMessage = '';
          this.reqEmpList();
          this.router.navigate(['/emp-list']);
          break;
        case 'NG':
          this.itemService.updateErrorMessage = result['msg'];
      }
    });
  }

  // 従業員情報追加
  reqEmpInsert(insForm) {
    var sendUrl = '/api/employee_insert';
    var body = JSON.stringify(insForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.itemService.insertErrorMessage = '';
          this.reqEmpList();
          this.router.navigate(['/emp-list']);
          break;
        case 'NG':
          this.itemService.insertErrorMessage = result['msg'];
      }
    });
  }

  // 従業員情報削除
  reqEmpDelete() {
    var sendUrl = '/api/employee_delete/' + this.itemService.employee_id;
    this.client.delete(sendUrl, http_options).subscribe(() => {
      console.log('削除完了');
    });
  }

  // 貸出情報取得（一覧）
  reqResList() {
    var sendUrl = '/api/resource_list';
    this.client.get(sendUrl).subscribe((resList) => {
      this.itemService.rentalInfoList = [{
        rentalDeviceId: ''
        , deviceId: ''
        , osId: ''
        , cpuId: ''
        , memoryId: ''
        , storageTypeId: ''
        , storageCapacityId: ''
        , employeeId: ''
        , jpnsName: ''
        , rentalStartDate: ''
        , rentalEndDate: ''
      }];
      for(var index in resList['rental_device_id_list']) {
        this.itemService.rentalInfoList[index] = {
          rentalDeviceId: resList['rental_device_id_list'][index]
          , deviceId: resList['device_id_list'][index]
          , osId: resList['os_id_list'][index]
          , cpuId: resList['cpu_id_list'][index]
          , memoryId: resList['memory_id_list'][index]
          , storageTypeId: resList['storage_type_id_list'][index]
          , storageCapacityId: resList['storage_capacity_id_list'][index]
          , employeeId: resList['employee_id_list'][index]
          , jpnsName: resList['jpns_name_list'][index]
          , rentalStartDate: resList['rental_start_date_list'][index]
          , rentalEndDate: resList['rental_end_date_list'][index]
        };
      }
    });
  }

  // 貸出情報取得（検索）
  reqResSearch(searchForm) {
    var sendUrl = '/api/resource_search';
    var body = JSON.stringify(searchForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((resSearch) => {
      this.itemService.rentalInfoList = [{
        rentalDeviceId: ''
        , deviceId: ''
        , osId: ''
        , cpuId: ''
        , memoryId: ''
        , storageTypeId: ''
        , storageCapacityId: ''
        , employeeId: ''
        , jpnsName: ''
        , rentalStartDate: ''
        , rentalEndDate: ''
      }];
      for(var index in resSearch['rental_device_id_list']) {
        this.itemService.rentalInfoList[index] = {
          rentalDeviceId: resSearch['rental_device_id_list'][index]
          , deviceId: resSearch['device_id_list'][index]
          , osId: resSearch['os_id_list'][index]
          , cpuId: resSearch['cpu_id_list'][index]
          , memoryId: resSearch['memory_id_list'][index]
          , storageTypeId: resSearch['storage_type_id_list'][index]
          , storageCapacityId: resSearch['storage_capacity_id_list'][index]
          , employeeId: resSearch['employee_id_list'][index]
          , jpnsName: resSearch['jpns_name_list'][index]
          , rentalStartDate: resSearch['rental_start_date_list'][index]
          , rentalEndDate: resSearch['rental_end_date_list'][index]
        };
      }
    });
  }

  // 機器追加
  reqResInsert(insForm) {
    let sendUrl = '/api/resource_insert';
    let body = JSON.stringify(insForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.router.navigate(['/res-list']);
          break;
      }
    });
  }

  // 機器更新
  reqResUpdate(updForm, rentalDeviceId) {
    var sendUrl = '/api/resource_update/' + rentalDeviceId;
    var body = JSON.stringify(updForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((result) => {
      switch (result['res']) {
        case 'OK':
          this.router.navigate(['/res-list']);
      }
    });
  }

  // 機器削除（論理削除）
  reqResDelete(rentalDeviceId) {
    var sendUrl = '/api/resource_delete/' + rentalDeviceId;
    this.client.post(sendUrl, http_options).subscribe(() => {});
    // 論理削除後に再度、検索しようとするとエラーになる。
  }

  // 機器申請
  reqRentalApply(applyForm) {
    var sendUrl = '/api/resource_apply';
    var body = JSON.stringify(applyForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((applyResult) => {
      switch (applyResult['res']) {
        case 'OK':
          this.itemService.deviceApplyMessage = '機器ID: ' + applyResult['rentalDeviceId'] + ' を貸し出しました。'
          this.router.navigate(['/res-list']);
        case 'NG':
          this.itemService.deviceApplyMessage = '割り当て可能な機器がありませんでした。';
      }
    })
  }

  // 機器返却
  reqRentalReturn(returnForm) {
    var sendUrl = '/api/resource_return';
    var body = JSON.stringify(returnForm.value);
    this.client.post(sendUrl, body, http_options).subscribe((returnResult) => {
      switch (returnResult['res']) {
        case 'OK':
          this.router.navigate(['/res-list']);
      }
    })
  }
}