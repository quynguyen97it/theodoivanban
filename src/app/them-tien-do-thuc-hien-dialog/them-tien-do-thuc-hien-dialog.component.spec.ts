import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemTienDoThucHienDialogComponent } from './them-tien-do-thuc-hien-dialog.component';

describe('ThemTienDoThucHienDialogComponent', () => {
  let component: ThemTienDoThucHienDialogComponent;
  let fixture: ComponentFixture<ThemTienDoThucHienDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemTienDoThucHienDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemTienDoThucHienDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
