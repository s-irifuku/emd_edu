import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Master, EmpList, EmpDetail } from './receive-json-model';

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

  //マスタデータ取得
  private BranchList: {}[] = [{
    branchIdList: ''
    , branchNameList: ''
  }];
  private DepartmentList: {}[] = [{
    departmentIdList: ''
    , departmentNameList: ''
  }];
  private DeviceList: {}[] = [{
    deviceIdList: ''
    , deviceNameList: ''
  }];
  private OSList: {}[] = [{
    osIdList: ''
    , osNameList: ''
  }];
  private CPUList: {}[] = [{
    cpuIdList: ''
    , cpuCoreList: ''
  }];
  private MemoryList: {}[] = [{
    memoryIdList: ''
    , memoryGbyteList: ''
  }];
  private StorageTypeList: {}[] = [{
    storageTypeIdList: ''
    , storageTypeNameList: ''
  }];
  private StorageCapacityList: {}[] = [{
    storageCapacityIdList: ''
    , storageCapacityGbyteList: ''
  }];
  reqMaster() {
    var sendUrl = '/api/master';
    this.client.get(sendUrl).subscribe((results: Master) => {
      this.BranchList['branchIdList'] = results.branch_dictionary['branch_id_list'];
      this.BranchList['branchNameList'] = results.branch_dictionary['branch_name_list'];
      this.DepartmentList['departmentIdList'] = results.department_dictionary['department_id_list'];
      this.DepartmentList['departmentNameList'] = results.department_dictionary['department_name_list'];
      this.DeviceList['deviceIdList'] = results.device_dictionary['device_id_list'];
      this.DeviceList['deviceNameList'] = results.device_dictionary['device_name_list'];
      this.OSList['osIdList'] = results.os_dictionary['os_id_list'];
      this.OSList['osNameList'] = results.os_dictionary['os_name_list'];
      this.CPUList['cpuIdList'] = results.cpu_dictionary['cpu_id_list'];
      this.CPUList['cpuCoreList'] = results.cpu_dictionary['cpu_core_list'];
      this.MemoryList['memoryIdList'] = results.memory_dictionary['memory_id_list'];
      this.MemoryList['memoryGbyteList'] = results.memory_dictionary['memory_gbyte_list'];
      this.StorageTypeList['storageTypeIdList'] = results.storage_type_dictionary['storage_type_id_list'];
      this.StorageTypeList['storageTypeNameList'] = results.storage_type_dictionary['storage_type_name_list'];
      this.StorageCapacityList['storageCapacityIdList'] = results.storage_capacity_dictionary['storage_capacity_id_list'];
      this.StorageCapacityList['storageCapacityGbyteList'] = results.storage_capacity_dictionary['storage_capacity_gbyte_list'];
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
  //【表示用】[(機器ID,機器名)]形式で返す
  getDisplayDeviceList() {
    var displayDeviceList: {}[] = [{
      id: ''
      , name: ''
    }];
    for(let index in this.DeviceList['deviceIdList']) {
      displayDeviceList[index] = {
        id: this.DeviceList['deviceIdList'][index],
        name: this.DeviceList['deviceNameList'][index]
      };
    }
    return displayDeviceList;
  }
  //【表示用】[(OSID,OS名)]形式で返す
  getDisplayOSList() {
    var displayOSList: {}[] = [{
      id: ''
      , name: ''
    }];
    for(let index in this.OSList['osIdList']) {
      displayOSList[index] = {
        id: this.OSList['osIdList'][index],
        name: this.OSList['osNameList'][index]
      };
    }
    return displayOSList;
  }
  //【表示用】[(CPUID,CPUコア)]形式で返す
  getDisplayCPUList() {
    var displayCPUList: {}[] = [{
      id: ''
      , core: ''
    }];
    for(let index in this.CPUList['cpuIdList']) {
      displayCPUList[index] = {
        id: this.CPUList['cpuIdList'][index],
        core: this.CPUList['cpuCoreList'][index]
      };
    }
    return displayCPUList;
  }
  //【表示用】[(メモリーID,メモリー名)]形式で返す
  getDisplayMemoryList() {
    var displayMemoryList: {}[] = [{
      id: ''
      , gbyte: ''
    }];
    for(let index in this.MemoryList['memoryIdList']) {
      displayMemoryList[index] = {
        id: this.MemoryList['memoryIdList'][index],
        gbyte: this.MemoryList['memoryGbyteList'][index]
      };
    }
    return displayMemoryList;
  }
  //【表示用】[(ストレージタイプID,ストレージタイプ名)]形式で返す
  getDisplayStorageTypeList() {
    var displayStorageTypeList: {}[] = [{
      id: ''
      , name: ''
    }];
    for(let index in this.StorageTypeList['storageTypeIdList']) {
      displayStorageTypeList[index] = {
        id: this.StorageTypeList['storageTypeIdList'][index],
        name: this.StorageTypeList['storageTypeNameList'][index]
      };
    }
    return displayStorageTypeList;
  }
  //【表示用】[(ストレージ容量ID,ストレージ容量ギガ)]形式で返す
  getDisplayStorageCapacityList() {
    var displayStorageCapacityList: {}[] = [{
      id: ''
      , gbyte: ''
    }];
    for(let index in this.StorageCapacityList['storageCapacityIdList']) {
      displayStorageCapacityList[index] = {
        id: this.StorageCapacityList['storageCapacityIdList'][index],
        gbyte: this.StorageCapacityList['storageCapacityGbyteList'][index]
      };
    }
    return displayStorageCapacityList;
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






  // 機器情報取得（一覧）
  //private displayResList: {}[] = [{
  //  id: ''
  //  , name: ''
  //  , date: ''
  //}];
  //reqResList() {
  //  var sendUrl = '/api/resource_list';
  //  this.client.get(sendUrl).subscribe((results: ResList) => {
  //    for(let index in results.idList) {
  //      this.displayResList[index] = {
  //        id: results.idList[index]
  //        , name: results.nameList[index]
  //        , date: results.dateList[index]
  //      };
  //    }
  //  });
  //}
  //getResList() {
  //  return this.displayResList;
  //}

  // 機器情報追加
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
}


