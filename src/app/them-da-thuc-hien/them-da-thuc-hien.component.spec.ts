import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemDaThucHienComponent } from './them-da-thuc-hien.component';

describe('ThemDaThucHienComponent', () => {
  let component: ThemDaThucHienComponent;
  let fixture: ComponentFixture<ThemDaThucHienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemDaThucHienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemDaThucHienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
