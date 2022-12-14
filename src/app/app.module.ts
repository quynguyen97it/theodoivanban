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
import { XuLyVanBanService } from './Service/xu-ly-van-ban.service';
import { LoginComponent } from './auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { ThemYKienChiDaoDialogComponent } from './them-ykien-chi-dao-dialog/them-ykien-chi-dao-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { XacNhanXoaVBChiDaoDialogComponent } from './xac-nhan-xoa-vbchi-dao-dialog/xac-nhan-xoa-vbchi-dao-dialog.component';
import { ThemTienDoThucHienDialogComponent } from './them-tien-do-thuc-hien-dialog/them-tien-do-thuc-hien-dialog.component';
import { CapNhatTienDoThucHienComponent } from './cap-nhat-tien-do-thuc-hien/cap-nhat-tien-do-thuc-hien.component';
import { XacNhanXoaTienDoThucHienComponent } from './xac-nhan-xoa-tien-do-thuc-hien/xac-nhan-xoa-tien-do-thuc-hien.component';
import { ThemDaThucHienComponent } from './them-da-thuc-hien/them-da-thuc-hien.component';
import { CapNhatDaThucHienComponent } from './cap-nhat-da-thuc-hien/cap-nhat-da-thuc-hien.component';
import { XoaDaThucHienComponent } from './xoa-da-thuc-hien/xoa-da-thuc-hien.component';
import {MatRadioModule} from '@angular/material/radio';
import { ThemYKienChiDaoTKComponent } from './them-ykien-chi-dao-tk/them-ykien-chi-dao-tk.component';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';

@NgModule({
  declarations: [
    AppComponent,
    ThemYKienChiDaoComponent,
    XuLyVanBanComponent,
    TraCuuVanBanComponent,
    ThongKeComponent,
    LoginComponent,
    NotFoundComponent,
    ThemYKienChiDaoDialogComponent,
    XacNhanXoaVBChiDaoDialogComponent,
    ThemTienDoThucHienDialogComponent,
    CapNhatTienDoThucHienComponent,
    XacNhanXoaTienDoThucHienComponent,
    ThemDaThucHienComponent,
    CapNhatDaThucHienComponent,
    XoaDaThucHienComponent,
    ThemYKienChiDaoTKComponent,
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
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatDatepickerModule,
    NgxMatSelectSearchModule,
    MaterialFileInputModule,
    MatRadioModule,
    NgImageFullscreenViewModule,
  ],
  providers: [XuLyVanBanService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
