import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';

@Component({
  selector: 'app-xac-nhan-xoa-vbchi-dao-dialog',
  templateUrl: './xac-nhan-xoa-vbchi-dao-dialog.component.html',
  styleUrls: ['./xac-nhan-xoa-vbchi-dao-dialog.component.scss']
})
export class XacNhanXoaVBChiDaoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public vbxoa: IncomingOfficialDispatch[],
    private themykienchidaoService: ThemYKienChiDaoService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<XacNhanXoaVBChiDaoDialogComponent>
  ) {
    //console.log(vbxoa['vbxoa']);
  }

  @ViewChild('multiSelect') multiSelect: MatSelect;
  ngOnInit(): void {
  }
  VanBanChiDao: IncomingOfficialDispatch[] = this.vbxoa['vbxoa'];
  xoaVB():void{
    this.themykienchidaoService.deleteUnapprovedDocument(this.VanBanChiDao['DocumentID']).subscribe({
      next: (data) => {
        this.themykienchidaoService.showToasterSuccess('','Xoá dữ liệu thành công.');
        //console.log(data);
      },
      error: (error) => {
        this.themykienchidaoService.showToasterError('','Xoá dữ liệu thất bại! Lỗi đường truyền!');
      },
      complete: () => {
        //window.location.reload();
        this.dialogRef.close({ status: true });
      }
    });
  }

}
