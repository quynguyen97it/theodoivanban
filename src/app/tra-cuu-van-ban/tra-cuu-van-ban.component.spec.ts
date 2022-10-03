import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraCuuVanBanComponent } from './tra-cuu-van-ban.component';

describe('TraCuuVanBanComponent', () => {
  let component: TraCuuVanBanComponent;
  let fixture: ComponentFixture<TraCuuVanBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraCuuVanBanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraCuuVanBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
