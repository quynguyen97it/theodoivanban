import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XuLyVanBanComponent } from './xu-ly-van-ban.component';

describe('XuLyVanBanComponent', () => {
  let component: XuLyVanBanComponent;
  let fixture: ComponentFixture<XuLyVanBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XuLyVanBanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XuLyVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
