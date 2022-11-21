import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';

@Component({
  selector: 'app-xoa-da-thuc-hien',
  templateUrl: './xoa-da-thuc-hien.component.html',
  styleUrls: ['./xoa-da-thuc-hien.component.scss']
})
export class XoaDaThucHienComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<XoaDaThucHienComponent>,
  ) { }

  ngOnInit(): void {

  }

  vbdi = this.data['dulieuchon'][0];

  xoaNoiDungHoanThanh(){
    let idVBDi = this.data['dulieuchon'][0]['OfficialDispatchID'];
    var formData: any = new FormData();

    formData.append("id", idVBDi);
    formData.append('_method', 'POST');
    this.xulyvanbanService.deleteComplete(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Xoá nội dung hoàn thành thành công.');
      },
      error: (error) => {
        this.xulyvanbanService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

}
