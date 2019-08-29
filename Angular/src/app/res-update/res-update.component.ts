import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServerCommunicationService } from '../server-communication.service';
import { DisplayItemService } from '../display-item.service';

@Component({
  selector: 'app-res-update',
  templateUrl: './res-update.component.html',
  styleUrls: ['./res-update.component.css']
})
export class ResUpdateComponent implements OnInit {
  updForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ServerCommunicationService,
    private displayItem: DisplayItemService// 消さない事
  ) { }

  ngOnInit() {
    this.updForm = this.fb.group({
      deviceId: ['', [Validators.required]],
      osId: ['', [Validators.required]],
      cpuId: ['', [Validators.required]],
      memoryId: ['', [Validators.required]],
      storageTypeId: ['', [Validators.required]],
      storageCapacityId: ['', [Validators.required]]
    })
  }
  get deviceId() { return this.updForm.get('deviceId'); }
  get osId() { return this.updForm.get('osId'); }
  get cpuId() { return this.updForm.get('cpuId'); }
  get memoryId() { return this.updForm.get('memoryId'); }
  get storageTypeId() { return this.updForm.get('storageTypeId'); }
  get storageCapacityId() { return this.updForm.get('storageCapacityId'); }

  onSubmit() {
    if (!this.updForm.invalid) {
       this.service.reqResUpdate(this.updForm);
    }
  }
}
