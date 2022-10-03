import { TestBed } from '@angular/core/testing';

import { ThemYKienChiDaoService } from './them-ykien-chi-dao.service';

describe('ThemYKienChiDaoService', () => {
  let service: ThemYKienChiDaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemYKienChiDaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
