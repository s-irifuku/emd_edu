//コンポーネントで利用する画面表示値を渡す役割。
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayItemService {
  //マスタデータ
  BranchList: {}[] = [{}];//支店
  DepartmentList: {}[] = [{}];//部署
  
  deviceList = [];//機器
  osList = [];//OS
  cpuList = [];//CPU
  memoryList = [];//メモリ
  storageTypeList = [];//ストレージタイプ
  storageCapacityList = [];//ストレージ容量


  // 貸出情報（一覧画面表示）
  rentalInfoList = [];
  // 各マスタのIDに対応するNAMEを返す(一覧、詳細)
  convertIdToName(id, targetMaster) {
    var masterList: any[];
    var name = 'name';
    switch (targetMaster) {
      case 'Device':
        masterList = this.deviceList;
        break;
      case 'OS':
        masterList = this.osList;
        break;
      case 'CPU':
        masterList = this.cpuList;
        name = 'core'
        break;
      case 'Memory':
        masterList = this.memoryList;
        name = 'gbyte'
        break;
      case 'StorageType':
        masterList = this.storageTypeList;
        break;
      case 'StorageCapacity':
        masterList = this.storageCapacityList;
        name = 'gbyte'
        break;
    }
    for ( let index in masterList ) {
      if (id == masterList[index]['id']) {
        return masterList[index][name]
      }
    }
  }

  // 貸出機器更新
  upd_rental_device_id = ''
  upd_device_id = ''
  upd_os_id = ''
  upd_cpu_id = ''
  upd_memory_id = ''
  upd_storage_type_id = ''
  upd_storage_capacity_id = ''


  constructor() { }
  
}
