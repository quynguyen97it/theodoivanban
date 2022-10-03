import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Phần mềm theo dõi văn bản';
  thongbao = 'Thông báo test';
  test:Test ={
    id: 1,
    name: 'Quy Ken'
  };
}

export class Test {
  id: number;
  name: string;
}
