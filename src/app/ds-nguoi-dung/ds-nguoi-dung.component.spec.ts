import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsNguoiDungComponent } from './ds-nguoi-dung.component';

describe('DsNguoiDungComponent', () => {
  let component: DsNguoiDungComponent;
  let fixture: ComponentFixture<DsNguoiDungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsNguoiDungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DsNguoiDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
