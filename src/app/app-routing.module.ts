import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemYKienChiDaoComponent } from './them-ykien-chi-dao/them-ykien-chi-dao.component';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { TraCuuVanBanComponent } from './tra-cuu-van-ban/tra-cuu-van-ban.component';
import { VanBanHoanThanhComponent } from './van-ban-hoan-thanh/van-ban-hoan-thanh.component';
import { XuLyVanBanComponent } from './xu-ly-van-ban/xu-ly-van-ban.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {path: '', component: XuLyVanBanComponent},
  {path: 'xulyvanban', component: XuLyVanBanComponent},
  {path: 'themykienchidao', component: ThemYKienChiDaoComponent},
  {path: 'tracuuvanban', component: TraCuuVanBanComponent},
  {path: 'thongke', component: ThongKeComponent},
  {path: 'vanbanhoanthanh', component: VanBanHoanThanhComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: XuLyVanBanComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
