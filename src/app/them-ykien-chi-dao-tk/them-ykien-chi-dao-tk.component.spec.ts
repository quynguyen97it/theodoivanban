import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemYKienChiDaoTKComponent } from './them-ykien-chi-dao-tk.component';

describe('ThemYKienChiDaoTKComponent', () => {
  let component: ThemYKienChiDaoTKComponent;
  let fixture: ComponentFixture<ThemYKienChiDaoTKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemYKienChiDaoTKComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemYKienChiDaoTKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
