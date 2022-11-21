import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileValidator } from 'ngx-material-file-input';
import { AuthService } from '../auth/auth.service';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';

@Component({
  selector: 'app-them-da-thuc-hien',
  templateUrl: './them-da-thuc-hien.component.html',
  styleUrls: ['./them-da-thuc-hien.component.scss']
})
export class ThemDaThucHienComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ThemDaThucHienComponent>,
  ) {
    this.fileControl = new FormControl(this.files, [
      FileValidator.maxContentSize(this.maxSize)
    ]);
  }

  ngOnInit(): void {
    this.themHT = this.fb.group({
      NgayVBDi: ['', Validators.required],
      NoiDungVBDi: ['', Validators.required],
      fileODF1: ['',[FileValidator.maxContentSize(this.maxSize)]],
    });

    this.fileControl.valueChanges.subscribe((files: any) => {
      if (!Array.isArray(files)) {
        this.files = [files];
      } else {
        this.files = files;
      }
    });
  }

  themHT: FormGroup;
  fileControl: FormControl;
  public files;
  readonly maxSize = 104857600;
  VanBanChiDao: IncomingOfficialDispatch[] = this.data;
  dataSource = this.VanBanChiDao['dulieuchon'];

  themHoanthanh(){
    let DocumentID = this.VanBanChiDao['dulieuchon'][0]['DocumentID'];
    var formData: any = new FormData();
    if(this.files !== undefined){
      if(this.files[0] !== null){
        formData.append("fileODF1", this.files[0]._files[0]);
      }
    }
    formData.append("YKienChiDaoId", DocumentID);
    formData.append("NgayVBDi", this.themHT.get('NgayVBDi').value);
    formData.append("NoiDungVBDi", this.themHT.get('NoiDungVBDi').value);
    formData.append('_method', 'POST');
    this.xulyvanbanService.createComplete(formData).subscribe({
      next: (data) => {
        this.xulyvanbanService.showToasterSuccess('','Kết thúc văn bản thành công.');
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
    return this.themHT.controls[controlName].hasError(errorName);
  }

}
