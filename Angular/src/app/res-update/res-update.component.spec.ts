import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResUpdateComponent } from './res-update.component';

describe('ResUpdateComponent', () => {
  let component: ResUpdateComponent;
  let fixture: ComponentFixture<ResUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
