//コンポーネントで利用する画面表示値を渡す役割。
import { Injectable } from '@angular/core';
import { EmpDetail } from './receive-json-model';

@Injectable({
  providedIn: 'root'
})
export class DisplayItemService {
  //マスタデータ
  branchList = [];//支店
  departmentList = [];//部署
  deviceList = [];//機器
  osList = [];//OS
  cpuList = [];//CPU
  memoryList = [];//メモリ
  storageTypeList = [];//ストレージタイプ
  storageCapacityList = [];//ストレージ容量

  // 従業員情報リスト
  empInfoList: {}[] = [{
    id: ''
    , name: ''
    , date: ''
  }];
  getEmpInfoList() {
    return this.empInfoList;
  }

  // コンポーネント間で使用する従業員ID
  employee_id = '';

  // 従業員情報詳細
  empDetail: EmpDetail;

  // 従業員更新エラーメッセージ
  updateErrorMessage = '';

  // 従業員追加エラーメッセージ
  insertErrorMessage = '';

  // 貸出情報リスト
  rentalInfoList: {}[] = [{
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
  getRentalInfoList() {
    return this.rentalInfoList;
  }

  // 各マスタのIDに対応するNAMEを返す(一覧、詳細)
  convertIdToName(id, targetMaster) {
    var masterList: any[];
    var name = '';
    var suffix = '';
    switch (targetMaster) {
      case 'Device':
        masterList = this.deviceList;
        name = 'name';
        break;
      case 'OS':
        masterList = this.osList;
        name = 'name';
        break;
      case 'CPU':
        masterList = this.cpuList;
        name = 'core';
        suffix = 'コア';
        break;
      case 'Memory':
        masterList = this.memoryList;
        name = 'gbyte';
        suffix = 'GB';
        break;
      case 'StorageType':
        masterList = this.storageTypeList;
        name = 'name';
        break;
      case 'StorageCapacity':
        masterList = this.storageCapacityList;
        name = 'gbyte';
        suffix = 'GB';
        break;
    }
    for ( let index in masterList ) {
      if (id == masterList[index]['id']) {
        return masterList[index][name]+suffix;
      }
    }
  }

  // 貸出情報のステータスをチェックする。
  checkStatus(start, end) {
    if (start == null && end==null) {
      return null;
    }else if (start == null) {
      return '未貸出';
    }else if (end == null) {
      return '貸出中';
    }
    var coolingLimitDate = new Date(end)
    coolingLimitDate.setMonth(coolingLimitDate.getDate() + 1);
    var toDate = new Date(Date.now())
    console.log(coolingLimitDate)
    console.log(toDate)
    if (coolingLimitDate < toDate) {
      return '冷却中'
    }
    return '未貸出';
  }

  // 貸出機器更新
  updRentalDeviceId = ''
  updDeviceId = ''
  updOsId = ''
  updCpuId = ''
  updMemoryId = ''
  updStorageTypeId = ''
  updStorageCapacityId = ''


  // 機器割当文言
  deviceApplyMessage = ''

  constructor() { }
  
}
