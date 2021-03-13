import { TestBed } from '@angular/core/testing';

import { CustomUtilityService } from './custom-utility.service';

describe('CustomUtilityService', () => {
  let service: CustomUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
