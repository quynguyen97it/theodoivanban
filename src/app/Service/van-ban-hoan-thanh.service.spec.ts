import { TestBed } from '@angular/core/testing';

import { VanBanHoanThanhService } from './van-ban-hoan-thanh.service';

describe('VanBanHoanThanhService', () => {
  let service: VanBanHoanThanhService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanHoanThanhService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
