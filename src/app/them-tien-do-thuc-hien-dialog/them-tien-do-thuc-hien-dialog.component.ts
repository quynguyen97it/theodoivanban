import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';

@Component({
  selector: 'app-them-tien-do-thuc-hien-dialog',
  templateUrl: './them-tien-do-thuc-hien-dialog.component.html',
  styleUrls: ['./them-tien-do-thuc-hien-dialog.component.scss']
})
export class ThemTienDoThucHienDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ThemTienDoThucHienDialogComponent>,
  ) {
    this.fileControl = new FormControl(this.files, [
      FileValidator.maxContentSize(this.maxSize)
    ]);
    //console.log(data);
   }

  ngOnInit(): void {

    this.themTD = this.fb.group({
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
  }
  themTD: FormGroup;
  fileControl: FormControl;
  public files;
  readonly maxSize = 104857600;
  VanBanChiDao: IncomingOfficialDispatch[] = this.data;
  dataSource = this.VanBanChiDao['dulieuchon'];

  capnhatTienDo(){
    let DocumentID = this.VanBanChiDao['dulieuchon'][0]['DocumentID'];
    var formData: any = new FormData();
    if(this.files !== undefined){
      if(this.files[0] !== null){
        formData.append("filePF1", this.files[0]._files[0]);
      }
    }
    formData.append("YKienChiDaoId", DocumentID);
    formData.append("NgayThucHien", this.themTD.get('NgayThucHien').value);
    formData.append("NoiDungThucHien", this.themTD.get('NoiDungThucHien').value);
    formData.append('_method', 'POST');
    this.xulyvanbanService.createProgress(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Thêm tiến độ thực hiện thành công.');
      },
      error: (error) => {
        this.xulyvanbanService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.dialogRef.close();
      }
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.themTD.controls[controlName].hasError(errorName);
  }

}
