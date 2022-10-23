import { Component, OnInit } from '@angular/core';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../Service/notification.service';

@Component({
  selector: 'app-them-ykien-chi-dao',
  templateUrl: './them-ykien-chi-dao.component.html',
  styleUrls: ['./them-ykien-chi-dao.component.scss']
})

export class ThemYKienChiDaoComponent implements OnInit{
  canbothuchien: any[] = [];
  canbophoihop: any[] = [];
  cbth: FormControl;
  themYKCD: FormGroup;
  importFileDSYKCD: FormGroup;
  importImageYKCD: FormGroup;
  dropdownList: any = [];
  selectedImplementationOfficer = new FormControl();
  selectedCoordinationOfficer = new FormControl();
  forDmata: any = new FormData();

  constructor(
    private http: HttpClient,
    private themykienchidaoService: ThemYKienChiDaoService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private config: NgSelectConfig,
    private notifyService : NotificationService,
    ) {
      this.config.notFoundText = 'Không có kết quả tìm kiếm';
      this.config.appendTo = 'body';
      this.config.bindValue = 'value';
    }

  ngOnInit(): void {
    this.selectedImplementationOfficer.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.selectedCoordinationOfficer.valueChanges.subscribe(value => {
      console.log(value);
    });

    this.themykienchidaoService.getImplementationOfficer().subscribe({
      next: (data) => {
        this.canbothuchien = data;
      },
      error: (error) => {
        console.log('Lỗi dữ liệu!');
      },
      complete: () => {}
    });

    this.themykienchidaoService.getCoordinationOfficer().subscribe({
      next: (data) => {
        this.canbophoihop = data;
      },
      error: (error) => {
        console.log('Lỗi dữ liệu!');
      },
      complete: () => {}
    });

    this.themYKCD = this.fb.group({
      SoKyHieuVB: ['', Validators.required],
      NgayVBDen: ['', Validators.required],
      NgayBanHanh: ['', Validators.required],
      CoQuanBanHanh: [''],
      TrichYeuVB: ['', Validators.required],
      TGHetHan: [''],
      fileTomtatCD: [''],
      TTYKienChiDao: [''],
      CBThucHien: [],
      CBPhoiHop: [],
    });

    this.importFileDSYKCD = this.fb.group({
      fileDSChiDao: ['', Validators.required],
    });

    this.importImageYKCD = this.fb.group({
      fileHinhAnhQ: ['', Validators.required],
    });
  }

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

  onItemSelect(item: any) {
    //console.log(item);
  }
  onSelectAll(items: any) {
    //console.log(items);
  }

  onSubmit() {
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer 20142|K4wwoTVRfkteDIH0mtpXmDOjIgs0lhZunmZmZKxm'
     })
    }
    var CBThucHien = [];
    var CBPhoiHop = [];
    var CBPhoiHoparr = [];

    if((this.themYKCD.get('CBThucHien').value) != null){
      CBThucHien = ((this.themYKCD.get('CBThucHien').value).map(i=>Number(i)));
    }
    else{
      alert('Vui lòng chọn cán bộ thực hiện!');
      return;
    }

    CBPhoiHoparr.push(this.themYKCD.get('CBPhoiHop').value);
    if((this.themYKCD.get('CBPhoiHop').value) != null && (this.themYKCD.get('CBPhoiHop').value) != '' ){
      CBPhoiHop = ((CBPhoiHoparr).map(i=>Number(i)));
    }

    var formData: any = new FormData();
    formData.append("fileTomtatCD", this.themYKCD.get('fileTomtatCD').value);
    formData.append("SoKyHieuVB", this.themYKCD.get('SoKyHieuVB').value);
    formData.append("NgayVBDen", this.themYKCD.get('NgayVBDen').value);
    formData.append("NgayBanHanh", this.themYKCD.get('NgayBanHanh').value);
    formData.append("CoQuanBanHanh", this.themYKCD.get('CoQuanBanHanh').value);
    formData.append("TrichYeuVB", this.themYKCD.get('TrichYeuVB').value);
    formData.append("TGHetHan", this.themYKCD.get('TGHetHan').value);
    formData.append("TTYKienChiDao", this.themYKCD.get('TTYKienChiDao').value);
    formData.append("CBThucHien", JSON.stringify(CBThucHien));
    formData.append("CBPhoiHop", JSON.stringify(CBPhoiHop));
    formData.append('_method', 'POST');;
    // for (var data of formData.entries()) {
    //   console.log(data[0]+ ', ' + data[1]);
    // }
    this.http
      .post('http://192.168.1.25:8001/api/themvanbanchidao', formData, HttpUploadOptions)
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });

  }

  ktFileHinhAnhTomTatYKCD(event){
    // const file = (event.target as HTMLInputElement).files[0];
    // this.themYKCD.patchValue({
    //   fileTomtatCD: file
    // });
    // this.themYKCD.get('fileTomtatCD').updateValueAndValidity()
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.themYKCD.get('fileTomtatCD').setValue(file);
    }
  }

  ktFileDSYKCD(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.importFileDSYKCD.get('fileDSChiDao').setValue(file);
    }
  }

  ktImageDSYKCD(event){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.importImageYKCD.get('fileHinhAnhQ').setValue(file);
    }
  }

  importFileDSYKCDF(){
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer 20142|K4wwoTVRfkteDIH0mtpXmDOjIgs0lhZunmZmZKxm'
     })
    }

    var formData: any = new FormData();
    formData.append("fileDSChiDao", this.importFileDSYKCD.get('fileDSChiDao').value);
    formData.append('_method', 'POST');;

    this.http
      .post('http://192.168.1.25:8001/api/themdschidao', formData, HttpUploadOptions)
      .subscribe({
        next: (response) => {
          this.showToasterSuccess('','Thêm dữ liệu thành công.');
          console.log(response);
        },
        error: (error) => {
          this.showToasterError('','Thêm dữ liệu thất bại!');
          console.log(error);
        },
      });
  }

  importImageDSYKCDF(){
    const HttpUploadOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer 20142|K4wwoTVRfkteDIH0mtpXmDOjIgs0lhZunmZmZKxm'
     })
    }

    var formData: any = new FormData();
    formData.append("fileHinhAnhQ", this.importImageYKCD.get('fileHinhAnhQ').value);
    formData.append('_method', 'POST');;

    this.http
      .post('http://192.168.1.25:8001/api/quetthemhinhanhchidao', formData, HttpUploadOptions)
      .subscribe({
        next: (response) => {
          var NgayBanHanh0 = response['NgayBanHanh'];
          var NgayBanHanh1 = NgayBanHanh0.split("/");
          var NgayBanHanh = NgayBanHanh1[2]+"-"+NgayBanHanh1[1]+"-"+NgayBanHanh1[0];
          var NgayDen0 = response['NgayDen'];
          var NgayDen1 = NgayDen0.split("/");
          var NgayDen = NgayDen1[2]+"-"+NgayDen1[1]+"-"+NgayDen1[0];

          this.showToasterSuccess('','Quét hình ảnh thành công.');
          this.themYKCD.get('TrichYeuVB').setValue(response['TrichYeu']);
          this.themYKCD.get('SoKyHieuVB').setValue(response['SoKyHieuVB']);
          this.themYKCD.get('CoQuanBanHanh').setValue(response['CoQuanBanHanh']);
          this.themYKCD.get('NgayVBDen').setValue(NgayDen);
          this.themYKCD.get('NgayBanHanh').setValue(NgayBanHanh);
          console.log(response);
        },
        error: (error) => {
          this.showToasterError('','Quét hình ảnh thất bại!');
          console.log(error);
        },
      });
  }

  showToasterSuccess(message, title){
    this.notifyService.showSuccess(message, title);
  }

  showToasterError(message, title){
      this.notifyService.showError(message, title);
  }

  showToasterInfo(message, title){
      this.notifyService.showInfo(message, title);
  }

  showToasterWarning(message, title){
      this.notifyService.showWarning(message, title);
  }
}
