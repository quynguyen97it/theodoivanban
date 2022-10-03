import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemYKienChiDaoComponent } from './them-ykien-chi-dao.component';

describe('ThemYKienChiDaoComponent', () => {
  let component: ThemYKienChiDaoComponent;
  let fixture: ComponentFixture<ThemYKienChiDaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemYKienChiDaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemYKienChiDaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
