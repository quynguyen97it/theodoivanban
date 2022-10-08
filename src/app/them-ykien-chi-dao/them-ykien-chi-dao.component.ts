import { Component, OnInit } from '@angular/core';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { Users } from '../models/users';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-them-ykien-chi-dao',
  templateUrl: './them-ykien-chi-dao.component.html',
  styleUrls: ['./them-ykien-chi-dao.component.scss']
})
export class ThemYKienChiDaoComponent implements OnInit {
  users: Users[] = [];

  constructor(
    private themykienchidaoService: ThemYKienChiDaoService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {}

  getDataUser():void{
    this.authService.getUserLogin().subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log('Lỗi dữ liệu!');
      },
      complete: () => {}
    })
  }

}
