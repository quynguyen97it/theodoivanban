import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoiDungChitietComponent } from './nguoi-dung-chitiet.component';

describe('NguoiDungChitietComponent', () => {
  let component: NguoiDungChitietComponent;
  let fixture: ComponentFixture<NguoiDungChitietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NguoiDungChitietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NguoiDungChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
