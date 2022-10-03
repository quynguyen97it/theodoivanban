import { TestBed } from '@angular/core/testing';

import { XuLyVanBanService } from './xu-ly-van-ban.service';

describe('XuLyVanBanService', () => {
  let service: XuLyVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XuLyVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
