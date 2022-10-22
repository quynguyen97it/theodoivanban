import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ThemYKienChiDaoComponent } from './them-ykien-chi-dao/them-ykien-chi-dao.component';
import { XuLyVanBanComponent } from './xu-ly-van-ban/xu-ly-van-ban.component';
import { TraCuuVanBanComponent } from './tra-cuu-van-ban/tra-cuu-van-ban.component';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { VanBanHoanThanhComponent } from './van-ban-hoan-thanh/van-ban-hoan-thanh.component';
import { XuLyVanBanService } from './Service/xu-ly-van-ban.service';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ThemYKienChiDaoComponent,
    XuLyVanBanComponent,
    TraCuuVanBanComponent,
    ThongKeComponent,
    VanBanHoanThanhComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgSelectModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot(),
  ],
  providers: [XuLyVanBanService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
