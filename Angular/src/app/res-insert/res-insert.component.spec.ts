import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResInsertComponent } from './res-insert.component';

describe('ResInsertComponent', () => {
  let component: ResInsertComponent;
  let fixture: ComponentFixture<ResInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
