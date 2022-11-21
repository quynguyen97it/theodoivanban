import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';

@Component({
  selector: 'app-cap-nhat-da-thuc-hien',
  templateUrl: './cap-nhat-da-thuc-hien.component.html',
  styleUrls: ['./cap-nhat-da-thuc-hien.component.scss']
})
export class CapNhatDaThucHienComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CapNhatDaThucHienComponent>,
  ) {
    this.fileControl = new FormControl(this.files, [
      FileValidator.maxContentSize(this.maxSize)
    ]);
  }

  ngOnInit(): void {
    this.capnhatHT = this.fb.group({
      NgayVBDi: ['', Validators.required],
      TrichYeuVBDi: ['', Validators.required],
      eODFilevbdi1: ['',[FileValidator.maxContentSize(this.maxSize)]],
    });

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });

    this.capnhatHT.get('NgayVBDi').setValue(this.data['dulieuchon'][0]['ReleaseDateTravel']);
    this.capnhatHT.get('TrichYeuVBDi').setValue(this.data['dulieuchon'][0]['Contents']);
  }

  capnhatHT: FormGroup;
  fileControl: FormControl;
  public files;
  readonly maxSize = 104857600;
  VanBanChiDao: IncomingOfficialDispatch[] = this.data;
  dataSource = this.VanBanChiDao['dulieuchon'];
  urlFile = this.authService.apiURL+'/generate-pdf/';
  fileHT = this.VanBanChiDao['dulieuchon'][0]['pathODF1'];

  guicapnhatHoanthanh(){
    let idVBDi = this.VanBanChiDao['dulieuchon'][0]['OfficialDispatchID'];
    var formData: any = new FormData();
    if(this.files !== undefined){
      if(this.files[0] !== null){
        formData.append("eODFilevbdi1", this.files[0]._files[0]);
      }
    }
    formData.append("id", idVBDi);
    formData.append("NgayVBDi", this.capnhatHT.get('NgayVBDi').value);
    formData.append("TrichYeuVBDi", this.capnhatHT.get('TrichYeuVBDi').value);
    formData.append('_method', 'POST');
    this.xulyvanbanService.updateComplete(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Cập nhật nội dung hoàn thành thành công.');
      },
      error: (error) => {
        this.xulyvanbanService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

  xoaFileTienDo(){
    let idVBDi = this.VanBanChiDao['dulieuchon'][0]['OfficialDispatchID'];
    var formData: any = new FormData();

    formData.append("id", idVBDi);
    formData.append('_method', 'POST');
    this.xulyvanbanService.deleteFileComplete(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Xoá File nội dung hoàn thành thành công.');
      },
      error: (error) => {
        this.xulyvanbanService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.fileHT = null;
      }
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.capnhatHT.controls[controlName].hasError(errorName);
  }

}
