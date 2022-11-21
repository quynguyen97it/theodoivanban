import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';


@Component({
  selector: 'app-xac-nhan-xoa-tien-do-thuc-hien',
  templateUrl: './xac-nhan-xoa-tien-do-thuc-hien.component.html',
  styleUrls: ['./xac-nhan-xoa-tien-do-thuc-hien.component.scss']
})
export class XacNhanXoaTienDoThucHienComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<XacNhanXoaTienDoThucHienComponent>,
  ) { }

  ngOnInit(): void {
  }
  tiendo = this.data['dulieuchon'][0];

  xoaTienDoTH(){
    let idTiendo = this.data['dulieuchon'][0]['id'];
    var formData: any = new FormData();

    formData.append("idTiendo", idTiendo);
    formData.append('_method', 'POST');
    this.xulyvanbanService.deleteProgress(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Xoá tiến độ thực hiện thành công.');
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
