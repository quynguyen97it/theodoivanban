import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { ThongKeService } from '../Service/thong-ke.service';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';

@Component({
  selector: 'app-them-ykien-chi-dao-tk',
  templateUrl: './them-ykien-chi-dao-tk.component.html',
  styleUrls: ['./them-ykien-chi-dao-tk.component.scss']
})
export class ThemYKienChiDaoTKComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private thongkeService: ThongKeService,
    private themykienchidaoService: ThemYKienChiDaoService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ThemYKienChiDaoTKComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.themCD = this.fb.group({
      NoiDungYKCD: ['', Validators.required],
    });

    this.capnhatChidao = this.fb.group({
      eYKCD: ['', Validators.required],
    });



    this.themykienchidaoService.getImplementationOfficerList(this.data['dulieuchon'][0].DocumentID).subscribe({
      next: (response) => {
        this.TTYKCD = response[2];
        this.TTYKCD.forEach(e => {
          this.statusYKCD[e.SId] = true;
          this.showYKCD[e.SId] = true;
        });

      },
      error: (error) => {
        console.log('Lỗi dữ liệu!');
      },
      complete: () => {}
    });
  }

  themCD: FormGroup;
  capnhatChidao: FormGroup;
  VanBanChiDao: IncomingOfficialDispatch[] = this.data;
  dataSource = this.VanBanChiDao['dulieuchon'];
  TTYKCD = [];
  showYKCD = {};
  statusYKCD = {};

  guiYKCD(){
    let DocumentID = this.VanBanChiDao['dulieuchon'][0]['DocumentID'];
    var formData: any = new FormData();
    formData.append("ID", DocumentID);
    formData.append("YKCD", this.themCD.get('NoiDungYKCD').value);
    formData.append('_method', 'POST');
    this.thongkeService.createDirective(formData).subscribe({
      next: (data) => {
        this.thongkeService.showToasterSuccess('','Thêm tiến độ thực hiện thành công.');
      },
      error: (error) => {
        this.thongkeService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.ngOnInit();
      }
    });
  }

  public suaYKCD(data){
    this.TTYKCD.forEach(e => {
      this.statusYKCD[e.SId] = true;
      this.showYKCD[e.SId] = true;
    });
    this.statusYKCD[data.SId] = false;
    this.capnhatChidao.get('eYKCD').setValue(data.summary);
  }

  public guicapnhatYKCD(data){
    var formData: any = new FormData();
    formData.append("id", data.SId);
    formData.append("eYKCD", this.capnhatChidao.get('eYKCD').value);
    formData.append('_method', 'POST');
    this.themykienchidaoService.updateDirective(formData).subscribe({
      next: (data) => {
        //
      },
      error: (error) => {
        this.themykienchidaoService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.TTYKCD.forEach(e => {
          this.statusYKCD[e.SId] = true;
          this.showYKCD[e.SId] = true;
        });
        this.ngOnInit();
      }
    });
  }

  public xoanoidungYKCD(tt){
    var formData: any = new FormData();
    formData.append("id", tt.SId);
    formData.append('_method', 'POST');
    this.themykienchidaoService.deleteDirective(formData).subscribe({
      next: (data) => {
        this.themykienchidaoService.showToasterSuccess('','Xoá thành công.');
      },
      error: (error) => {
        this.themykienchidaoService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.ngOnInit();
      }
    });
  }

  public huycapnhatChidao(){
    this.TTYKCD.forEach(e => {
      this.statusYKCD[e.SId] = true;
      this.showYKCD[e.SId] = true;
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.themCD.controls[controlName].hasError(errorName);
  }

  public hasError2 = (controlName: string, errorName: string) =>{
    return this.capnhatChidao.controls[controlName].hasError(errorName);
  }

}
