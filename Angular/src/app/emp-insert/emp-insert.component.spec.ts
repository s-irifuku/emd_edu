import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInsertComponent } from './emp-insert.component';

describe('EmpInsertComponent', () => {
  let component: EmpInsertComponent;
  let fixture: ComponentFixture<EmpInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
