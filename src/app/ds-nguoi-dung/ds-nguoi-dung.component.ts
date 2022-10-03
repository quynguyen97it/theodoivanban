import { Component, OnInit } from '@angular/core';
import { NguoiDung } from '../nguoi-dung';
import { NguoiDungService } from '../nguoi-dung.service';

@Component({
  selector: 'app-ds-nguoi-dung',
  template: `
    <ul>
      <li *ngFor='let nd of nguoidung'>
        <a href="#" (click)="chitietNguoiDung(nd)">{{nd.fullname}}</a>
      </li>
    </ul>
    <app-nguoi-dung-chitiet [nd]="chonNguoiDung"></app-nguoi-dung-chitiet>
  `,
  styleUrls: ['./ds-nguoi-dung.component.scss']
})
export class DsNguoiDungComponent implements OnInit {
  chonNguoiDung: NguoiDung;
  nguoidung:NguoiDung[];
  constructor(private nguoidungService:NguoiDungService) {
    this.nguoidung = this.nguoidungService.getAll();
  }

  ngOnInit(): void {
  }

  chitietNguoiDung(nd:NguoiDung){
    this.chonNguoiDung = nd;
  }
}
