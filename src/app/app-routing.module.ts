import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemYKienChiDaoComponent } from './them-ykien-chi-dao/them-ykien-chi-dao.component';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { TraCuuVanBanComponent } from './tra-cuu-van-ban/tra-cuu-van-ban.component';
import { VanBanHoanThanhComponent } from './van-ban-hoan-thanh/van-ban-hoan-thanh.component';
import { XuLyVanBanComponent } from './xu-ly-van-ban/xu-ly-van-ban.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: XuLyVanBanComponent, canActivate: [AuthGuard],
    data: [
      [4]
  ]},
  {path: 'xulyvanban', component: XuLyVanBanComponent, canActivate: [AuthGuard],
    data: [
      [4]
  ]},
  {path: 'themykienchidao', component: ThemYKienChiDaoComponent, canActivate: [AuthGuard],
    data: [
      [3]
  ]},
  {path: 'tracuuvanban', component: TraCuuVanBanComponent, canActivate: [AuthGuard],
    data: [
      [4]
  ]},
  {path: 'thongke', component: ThongKeComponent, canActivate: [AuthGuard],
    data: [
      [0,1,2,3]
  ]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
