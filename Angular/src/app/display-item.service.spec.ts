import { TestBed } from '@angular/core/testing';

import { DisplayItemService } from './display-item.service';

describe('DisplayItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayItemService = TestBed.get(DisplayItemService);
    expect(service).toBeTruthy();
  });
});
