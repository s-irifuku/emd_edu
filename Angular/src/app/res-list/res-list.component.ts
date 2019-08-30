import { Component, OnInit } from '@angular/core';
import { DisplayItemService } from '../display-item.service';
import { ServerCommunicationService } from '../server-communication.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-res-list',
  templateUrl: './res-list.component.html',
  styleUrls: ['./res-list.component.css']
})
export class ResListComponent implements OnInit {
  // フォーム定義
  searchForm: FormGroup;
  applyForm: FormGroup;
  returnForm: FormGroup;

  constructor(
    private itemService: DisplayItemService
    , private serverService: ServerCommunicationService
    , private fb: FormBuilder
    , private router:Router
  ) { }

  ngOnInit() {
    // フォーム初期化
    this.searchForm = this.fb.group({
      deviceId: ['']
      , osId: ['']
      , cpuId: ['']
      , memoryId: ['']
      , storageTypeId: ['']
      , storageCapacityId: ['']
      , employeeId: ['']
      , jpnsName: ['']
    });
    this.applyForm = this.fb.group({
      deviceId: ['']
      , osId: ['']
      , cpuId: ['']
      , memoryId: ['']
      , storageTypeId: ['']
      , storageCapacityId: ['']
      , employeeId: ['', [Validators.required]]
      , rentalStartDate: ['', [Validators.required, Validators.pattern('^[0-9]{4}[/]{1}[0-9]{2}[/]{1}[0-9]{2}$')]]
    });
    this.returnForm = this.fb.group({
      rentalDeviceId: ['', [Validators.required]]
      , rentalEndDate: ['', [Validators.required, Validators.pattern('^[0-9]{4}[/]{1}[0-9]{2}[/]{1}[0-9]{2}$')]]
    });
    // 貸出情報取得（一覧）
    this.serverService.reqResList();
  }

  get employeeId() { return this.applyForm.get('employeeId'); }
  get rentalStartDate() { return this.applyForm.get('rentalStartDate'); }
  get rentalDeviceId() { return this.returnForm.get('rentalDeviceId'); }
  get rentalEndDate() { return this.returnForm.get('rentalEndDate'); }


  goSearch() {
    // 検索処理実行
    this.serverService.reqResSearch(this.searchForm);
  }

  getRentalInfoList() {
    this.itemService.getRentalInfoList();
  }

  goUpdate(rentalInfo) {
    this.itemService.updRentalDeviceId = rentalInfo.rentalDeviceId;
    this.itemService.updDeviceId = rentalInfo.deviceId;
    this.itemService.updOsId = rentalInfo.osId;
    this.itemService.updCpuId = rentalInfo.cpuId;
    this.itemService.updMemoryId = rentalInfo.memoryId;
    this.itemService.updStorageTypeId = rentalInfo.storageTypeId;
    this.itemService.updStorageCapacityId = rentalInfo.storageCapacityId;
    this.router.navigate(['/res-update']);
  }

  goDelete(rentalDeviceId) {
    this.serverService.reqResDelete(rentalDeviceId);
  }

  goApply() {
    this.serverService.reqRentalApply(this.applyForm);
  }

  goReturn() {
    this.serverService.reqRentalReturn(this.returnForm);
  }
}
