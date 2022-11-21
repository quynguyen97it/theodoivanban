import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacNhanXoaTienDoThucHienComponent } from './xac-nhan-xoa-tien-do-thuc-hien.component';

describe('XacNhanXoaTienDoThucHienComponent', () => {
  let component: XacNhanXoaTienDoThucHienComponent;
  let fixture: ComponentFixture<XacNhanXoaTienDoThucHienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XacNhanXoaTienDoThucHienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XacNhanXoaTienDoThucHienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
