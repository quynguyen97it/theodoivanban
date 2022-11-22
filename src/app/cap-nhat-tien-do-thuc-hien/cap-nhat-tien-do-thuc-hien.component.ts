import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';

@Component({
  selector: 'app-cap-nhat-tien-do-thuc-hien',
  templateUrl: './cap-nhat-tien-do-thuc-hien.component.html',
  styleUrls: ['./cap-nhat-tien-do-thuc-hien.component.scss']
})
export class CapNhatTienDoThucHienComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CapNhatTienDoThucHienComponent>,
  ) {
    this.fileControl = new FormControl(this.files, [
      FileValidator.maxContentSize(this.maxSize)
    ]);
  }

  ngOnInit(): void {
    //console.log(this.data);

    this.capnhatTD = this.fb.group({
      NgayThucHien: ['', Validators.required],
      NoiDungThucHien: ['', Validators.required],
      fileTomtatCD: ['',[FileValidator.maxContentSize(this.maxSize)]],
    });

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });

    this.capnhatTD.get('NgayThucHien').setValue(this.data['dulieuchon'][0]['ImplementationDate']);
    this.capnhatTD.get('NoiDungThucHien').setValue(this.data['dulieuchon'][0]['ImplementationContent']);
  }

  capnhatTD: FormGroup;
  fileControl: FormControl;
  public files;
  readonly maxSize = 104857600;
  VanBanChiDao: IncomingOfficialDispatch[] = this.data;
  dataSource = this.VanBanChiDao['dulieuchon'];
  fileTD = this.data['fileTD'];
  urlFile = this.authService.apiURL+'/generate-pdf/';

  guicapnhatTienDo(){
    let idTiendo = this.VanBanChiDao['dulieuchon'][0]['id'];
    var formData: any = new FormData();
    if(this.files !== undefined){
      if(this.files[0] !== null){
        formData.append("eODFile1", this.files[0]._files[0]);
      }
    }
    formData.append("idTiendo", idTiendo);
    formData.append("eNgayThucHien", this.capnhatTD.get('NgayThucHien').value);
    formData.append("eTrichYeu", this.capnhatTD.get('NoiDungThucHien').value);
    formData.append('_method', 'POST');
    this.xulyvanbanService.updateProgress(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Cập nhật tiến độ thực hiện thành công.');
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
    let idTiendo = this.VanBanChiDao['dulieuchon'][0]['id'];
    var formData: any = new FormData();

    formData.append("idTiendo", idTiendo);
    formData.append('_method', 'POST');
    this.xulyvanbanService.deleteFileProgress(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Xoá File tiến độ thực hiện thành công.');
      },
      error: (error) => {
        this.xulyvanbanService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.fileTD = [];
        this.ngOnInit();
      }
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.capnhatTD.controls[controlName].hasError(errorName);
  }

}
