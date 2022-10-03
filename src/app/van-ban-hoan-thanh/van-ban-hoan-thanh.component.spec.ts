import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanBanHoanThanhComponent } from './van-ban-hoan-thanh.component';

describe('VanBanHoanThanhComponent', () => {
  let component: VanBanHoanThanhComponent;
  let fixture: ComponentFixture<VanBanHoanThanhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VanBanHoanThanhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VanBanHoanThanhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
