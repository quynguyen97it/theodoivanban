import { Injectable } from '@angular/core';
import { NguoiDung } from './nguoi-dung';

@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {
  constructor() { }
  getAll():NguoiDung[]{
    return [
      {id:1, username: 'quynn', password: 'Demo@2022', firstname:'Nguyễn', lastname:'Ngọc Quý',fullname:'Nguyễn Ngọc Quý'},
      {id:2, username: 'thangnc', password: 'Demo@2022', firstname:'Nguyễn', lastname:'Chiến Thắng',fullname:'Nguyễn Chiến Thắng'}
    ];
  }
}
