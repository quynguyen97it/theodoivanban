import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule }   from '@angular/forms';
import { DsNguoiDungComponent } from './ds-nguoi-dung/ds-nguoi-dung.component';
import { NguoiDungService } from './nguoi-dung.service';
import { NguoiDungChitietComponent } from './nguoi-dung-chitiet/nguoi-dung-chitiet.component';
import { ThemYKienChiDaoComponent } from './them-ykien-chi-dao/them-ykien-chi-dao.component';
import { XuLyVanBanComponent } from './xu-ly-van-ban/xu-ly-van-ban.component';
import { TraCuuVanBanComponent } from './tra-cuu-van-ban/tra-cuu-van-ban.component';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { VanBanHoanThanhComponent } from './van-ban-hoan-thanh/van-ban-hoan-thanh.component';

@NgModule({
  declarations: [
    AppComponent,
    DsNguoiDungComponent,
    NguoiDungChitietComponent,
    ThemYKienChiDaoComponent,
    XuLyVanBanComponent,
    TraCuuVanBanComponent,
    ThongKeComponent,
    VanBanHoanThanhComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [NguoiDungService],
  bootstrap: [AppComponent]
})
export class AppModule { }
