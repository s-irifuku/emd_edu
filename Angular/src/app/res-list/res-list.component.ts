import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ServerCommunicationService } from '../server-communication.service'
import { DisplayItemService } from '../display-item.service';

@Component({
  selector: 'app-res-list',
  templateUrl: './res-list.component.html',
  styleUrls: ['./res-list.component.css']
})
export class ResListComponent implements OnInit {

  constructor(
    private router:Router
    , private service: ServerCommunicationService
    , private displayItem: DisplayItemService
  ) { }

  ngOnInit() {
    // 貸出情報取得（一覧）
    this.service.reqResList();
  }

  // 貸出情報のステータスをチェックする。
  checkStatus(start, end) {
    if (start == null) {
      return '未貸出';
    }else if (end == null) {
      return '貸出中';
    }
    //TODO new Date(end)
    return '冷却中';
  }

  goUpdate(rentalInfo) {
    this.displayItem.upd_rental_device_id = rentalInfo.rental_device_id;
    this.displayItem.upd_device_id = rentalInfo.device_id;
    this.displayItem.upd_os_id = rentalInfo.os_id;
    this.displayItem.upd_cpu_id = rentalInfo.cpu_id;
    this.displayItem.upd_memory_id = rentalInfo.memory_id;
    this.displayItem.upd_storage_type_id = rentalInfo.storage_type_id;
    this.displayItem.upd_storage_capacity_id = rentalInfo.storage_capacity_id;
    this.router.navigate(['/res-update']);
  }

  goDelete(rentalDeviceId) {
    this.service.reqResDelete(rentalDeviceId);
    this.service.reqResList();
  }

}
