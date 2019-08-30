import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ServerCommunicationService } from '../server-communication.service';
import { DisplayItemService } from '../display-item.service';

@Component({
  selector: 'app-res-insert',
  templateUrl: './res-insert.component.html',
  styleUrls: ['./res-insert.component.css']
})
export class ResInsertComponent implements OnInit {
  insForm: FormGroup;

  constructor(
    private fb: FormBuilder
    , private service: ServerCommunicationService
    , private displayItem: DisplayItemService//消さない事
  ) { }

  ngOnInit() {
    this.insForm = this.fb.group({
      deviceId: ['', [Validators.required]]
      , osId: ['', [Validators.required]]
      , cpuId: ['', [Validators.required]]
      , memoryId: ['', [Validators.required]]
      , storageTypeId: ['', [Validators.required]]
      , storageCapacityId: ['', [Validators.required]]
    });  
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
