import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemYKienChiDaoDialogComponent } from './them-ykien-chi-dao-dialog.component';

describe('ThemYKienChiDaoDialogComponent', () => {
  let component: ThemYKienChiDaoDialogComponent;
  let fixture: ComponentFixture<ThemYKienChiDaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemYKienChiDaoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemYKienChiDaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
