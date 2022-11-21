import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatDaThucHienComponent } from './cap-nhat-da-thuc-hien.component';

describe('CapNhatDaThucHienComponent', () => {
  let component: CapNhatDaThucHienComponent;
  let fixture: ComponentFixture<CapNhatDaThucHienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapNhatDaThucHienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapNhatDaThucHienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
