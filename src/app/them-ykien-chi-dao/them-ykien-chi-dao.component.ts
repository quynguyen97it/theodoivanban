import { Component, OnInit } from '@angular/core';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { Users } from '../models/users';

@Component({
  selector: 'app-them-ykien-chi-dao',
  templateUrl: './them-ykien-chi-dao.component.html',
  styleUrls: ['./them-ykien-chi-dao.component.scss']
})
export class ThemYKienChiDaoComponent implements OnInit {
  users: Users[] = [];

  constructor(private themykienchidaoService: ThemYKienChiDaoService) { }

  ngOnInit(): void {
    this.themykienchidaoService.getAll().subscribe((data: Users[])=>{
      this.users = data;
      console.log(this.users);
    })
  }

}
