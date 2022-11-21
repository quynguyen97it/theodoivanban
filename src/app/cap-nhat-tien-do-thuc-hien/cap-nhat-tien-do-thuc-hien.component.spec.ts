import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapNhatTienDoThucHienComponent } from './cap-nhat-tien-do-thuc-hien.component';

describe('CapNhatTienDoThucHienComponent', () => {
  let component: CapNhatTienDoThucHienComponent;
  let fixture: ComponentFixture<CapNhatTienDoThucHienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapNhatTienDoThucHienComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapNhatTienDoThucHienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
