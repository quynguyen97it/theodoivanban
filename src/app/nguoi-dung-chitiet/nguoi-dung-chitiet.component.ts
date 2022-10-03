import { Component, OnInit, Input } from '@angular/core';
import { NguoiDung } from '../nguoi-dung';

@Component({
  selector: 'app-nguoi-dung-chitiet',
  template: `
    <section *ngIf="nd">
      <h2>{{nd.lastname}}</h2>
    </section>
  `,
  styles: [
  ]
})
export class NguoiDungChitietComponent implements OnInit {
  @Input()nd: NguoiDung;
  constructor() { }

  ngOnInit(): void {
  }

}
