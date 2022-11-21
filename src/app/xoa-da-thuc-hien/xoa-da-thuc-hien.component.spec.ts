import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XoaDaThucHienComponent } from './xoa-da-thuc-hien.component';

describe('XoaDaThucHienComponent', () => {
  let component: XoaDaThucHienComponent;
  let fixture: ComponentFixture<XoaDaThucHienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XoaDaThucHienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XoaDaThucHienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
