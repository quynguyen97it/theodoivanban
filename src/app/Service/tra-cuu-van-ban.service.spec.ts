import { TestBed } from '@angular/core/testing';

import { TraCuuVanBanService } from './tra-cuu-van-ban.service';

describe('TraCuuVanBanService', () => {
  let service: TraCuuVanBanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraCuuVanBanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
