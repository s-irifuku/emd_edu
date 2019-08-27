import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ServerCommunicationService } from '../server-communication.service';

@Component({
  selector: 'app-res-insert',
  templateUrl: './res-insert.component.html',
  styleUrls: ['./res-insert.component.css']
})
export class ResInsertComponent implements OnInit {
  insForm: FormGroup;
  deviceList = [];
  osList = [];
  cpuList = [];
  memoryList = [];
  storageTypeList = [];
  storageCapacityList = [];

  constructor(
    private fb: FormBuilder,
    private service: ServerCommunicationService
  ) { }

  ngOnInit() {
    this.insForm = this.fb.group({
      deviceId: ['', [Validators.required]],
      osId: ['', [Validators.required]],
      cpuId: ['', [Validators.required]],
      memoryId: ['', [Validators.required]],
      storageTypeId: ['', [Validators.required]],
      storageCapacityId: ['', [Validators.required]]
    });
    this.deviceList = this.service.getDisplayDeviceList();
    this.osList = this.service.getDisplayOSList();
    this.cpuList = this.service.getDisplayCPUList();
    this.memoryList = this.service.getDisplayMemoryList();
    this.storageTypeList = this.service.getDisplayStorageTypeList();
    this.storageCapacityList = this.service.getDisplayStorageCapacityList();
  }
  get deviceId() { return this.insForm.get('deviceId'); }
  get osId() { return this.insForm.get('osId'); }
  get cpuId() { return this.insForm.get('cpuId'); }
  get memoryId() { return this.insForm.get('memoryId'); }
  get storageTypeId() { return this.insForm.get('storageTypeId'); }
  get storageCapacityId() { return this.insForm.get('storageCapacityId'); }

  onSubmit() {
    if (!this.insForm.invalid) {
       this.service.reqResInsert(this.insForm);
    }
  }
}
