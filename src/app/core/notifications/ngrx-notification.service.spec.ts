import { TestBed } from '@angular/core/testing';

import { NgrxNotificationService } from './ngrx-notification.service';

describe('NgrxNotificationService', () => {
  let service: NgrxNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
