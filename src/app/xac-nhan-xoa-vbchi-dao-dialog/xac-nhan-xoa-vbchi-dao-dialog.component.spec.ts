import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XacNhanXoaVBChiDaoDialogComponent } from './xac-nhan-xoa-vbchi-dao-dialog.component';

describe('XacNhanXoaVBChiDaoDialogComponent', () => {
  let component: XacNhanXoaVBChiDaoDialogComponent;
  let fixture: ComponentFixture<XacNhanXoaVBChiDaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XacNhanXoaVBChiDaoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XacNhanXoaVBChiDaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
