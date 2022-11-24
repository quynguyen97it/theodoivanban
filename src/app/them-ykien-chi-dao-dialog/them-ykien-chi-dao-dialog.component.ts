import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { FileValidator } from 'ngx-material-file-input';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../auth/auth.service';
import { XacNhanXoaVBChiDaoDialogComponent } from '../xac-nhan-xoa-vbchi-dao-dialog/xac-nhan-xoa-vbchi-dao-dialog.component';

@Component({
  selector: 'app-them-ykien-chi-dao-dialog',
  templateUrl: './them-ykien-chi-dao-dialog.component.html',
  styleUrls: ['./them-ykien-chi-dao-dialog.component.scss']
})
export class ThemYKienChiDaoDialogComponent implements OnInit, AfterViewInit, OnDestroy {
  fileControl: FormControl;
  public files;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch[],
    private themykienchidaoService: ThemYKienChiDaoService,
    private fb: FormBuilder,
    private authService: AuthService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ThemYKienChiDaoDialogComponent>,
    )
  {
    this.fileControl = new FormControl(this.files, [
      FileValidator.maxContentSize(this.maxSize)
    ]);
  }

  VanBanChiDao: IncomingOfficialDispatch[] = this.data['dulieuchon'];
  urlChitietHinhanhTT = this.authService.apiURL+'/storage/'+this.VanBanChiDao[0]['summary'];
  summaryStatus = this.VanBanChiDao[0]['summary'];
  dataSource = this.VanBanChiDao;
  displayedColumns: string[] = ['TextExcerpt'];
  TTYKCD = this.data['dsykcd'];
  statusYKCD = {};
  showYKCD = {};
  currentIndex: any = -1;
  showFlag: any = false;
  imageObject: Array<object> = [];

  @ViewChild('multiSelect') multiSelect: MatSelect;
  ngOnInit(): void {
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

    this.duyetYKCD = this.fb.group({
      SoKyHieuVanBan: ['', Validators.required],
      eNgayVBDen: ['', Validators.required],
      NgayBanHanh: ['', Validators.required],
      eCoQuanBanHanh: [''],
      TrichYeuVanBan: ['', Validators.required],
      ThoiGianHetHan: ['', Validators.required],
      fileTomtatCD: ['',[FileValidator.maxContentSize(this.maxSize)]],
      TTYKienChiDao: [''],
      CBThucHien: [, Validators.required],
      CBPhoiHop: [],
    });

    this.capnhatChidao = this.fb.group({
      eYKCD: ['', Validators.required],
    });

    this.duyetYKCD.get('CBThucHien').setValue(this.data['dscbth']);
    this.duyetYKCD.get('CBPhoiHop').setValue(this.data['dscbph']);
    this.duyetYKCD.get('SoKyHieuVanBan').setValue(this.data['dulieuchon'][0].IncomingTextNumberNotation);
    this.duyetYKCD.get('NgayBanHanh').setValue(this.data['dulieuchon'][0].ReleaseDate);
    this.duyetYKCD.get('TrichYeuVanBan').setValue(this.data['dulieuchon'][0].TextExcerpt);
    this.duyetYKCD.get('eNgayVBDen').setValue(this.data['dulieuchon'][0].DateOfReceiptOfDispatch);
    this.duyetYKCD.get('ThoiGianHetHan').setValue(this.data['dulieuchon'][0].ExpirationDate);
    this.duyetYKCD.get('eCoQuanBanHanh').setValue(this.data['dulieuchon'][0].AgencyIssued);

    this.timkiemCBTH.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.canbothuchien = this.tmpCBTH;
        if (!this.canbothuchien)
        {
          return;
        }

        let search = this.timkiemCBTH.value;
        if (!search)
        {
          this.canbothuchien.slice();
          return;
        }
        else
        {
          search = search.toLowerCase();
        }

        this.canbothuchien =this.canbothuchien.filter(cb => cb.FullName.toLowerCase().indexOf(search) > -1);
      });

      this.timkiemCBPH.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.canbophoihop = this.tmpCBPH;
        if (!this.canbophoihop)
        {
          return;
        }

        let search = this.timkiemCBPH.value;
        if (!search)
        {
          this.canbophoihop.slice();
          return;
        }
        else
        {
          search = search.toLowerCase();
        }

        this.canbophoihop =this.canbophoihop.filter(cb => cb.FullName.toLowerCase().indexOf(search) > -1);
      });

      this.fileControl.valueChanges.subscribe((files: any) => {
        if (!Array.isArray(files)) {
          this.files = [files];
        } else {
          this.files = files;
        }
      });
  }

  ngAfterViewInit() {
    //
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  readonly maxSize = 104857600;
  protected _onDestroy = new Subject<void>();
  duyetYKCD: FormGroup;
  capnhatChidao: FormGroup;
  canbothuchien: any[] = this.data['cbth'];
  canbophoihop: any[] = this.data['cbph'];
  public timkiemCBTH: FormControl = new FormControl();
  public timkiemCBPH: FormControl = new FormControl();
  protected tmpCBTH: string[] = this.canbothuchien;
  protected tmpCBPH: string[] = this.canbophoihop;

  duyetVBChiDao(){
    var CBThucHien = [];
    var CBPhoiHop = [];

    if((this.duyetYKCD.get('CBThucHien').value) != null){
      CBThucHien = ((this.duyetYKCD.get('CBThucHien').value).map(i=>Number(i)));
    }
    else{
      this.themykienchidaoService.showToasterError('','Vui lòng chọn cán bộ thực hiện!');
      return;
    }

    if((this.duyetYKCD.get('CBPhoiHop').value) != null)
    {
      CBPhoiHop = ((this.duyetYKCD.get('CBPhoiHop').value).map(i=>Number(i)));
    }

    let DocumentID = this.VanBanChiDao[0]['DocumentID'];


    var formData: any = new FormData();
    formData.append("YKienChiDaoId", DocumentID);

    if(this.files !== undefined){
      if(this.files[0] !== null){
        formData.append("fileTomtatCD", this.files[0]._files[0]);
      }
    }

    formData.append("SoKyHieuVanBan", this.duyetYKCD.get('SoKyHieuVanBan').value);
    formData.append("eNgayVBDen", this.duyetYKCD.get('eNgayVBDen').value);
    formData.append("NgayBanHanh", this.duyetYKCD.get('NgayBanHanh').value);
    formData.append("eCoQuanBanHanh", this.duyetYKCD.get('eCoQuanBanHanh').value);
    formData.append("TrichYeuVanBan", this.duyetYKCD.get('TrichYeuVanBan').value);
    formData.append("ThoiGianHetHan", this.duyetYKCD.get('ThoiGianHetHan').value);
    formData.append("TTYKienChiDao", this.duyetYKCD.get('TTYKienChiDao').value);
    formData.append("CBThucHien", JSON.stringify(CBThucHien));
    formData.append("CBPhoiHop", JSON.stringify(CBPhoiHop));
    formData.append('_method', 'POST');

    this.themykienchidaoService.documentApproval(formData).subscribe({
      next: (data) => {
        //
      },
      error: (error) => {
        this.themykienchidaoService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.dialogRef.close({ result: true });
      }
    });
  }

  xoaYKCD(){
    let vbxoa = this.VanBanChiDao[0];

    const dialogRef = this.dialog.open(XacNhanXoaVBChiDaoDialogComponent,{
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {vbxoa},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.dialogRef.close({ status: true });
      }
      //console.log(`Dialog result: ${result}`);
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

  public xoahinhanhYKCD(){
    let DocumentID = this.VanBanChiDao[0]['DocumentID'];
    var formData: any = new FormData();
    formData.append("YKienChiDaoId", DocumentID);
    formData.append('_method', 'POST');
    this.themykienchidaoService.deleteDirectiveImage(formData).subscribe({
      next: (data) => {
        this.themykienchidaoService.showToasterSuccess('','Xoá hình ảnh chỉ đạo thành công.');
      },
      error: (error) => {
        this.themykienchidaoService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {
        this.summaryStatus = null;
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
    return this.duyetYKCD.controls[controlName].hasError(errorName);
  }

  public hasError2 = (controlName: string, errorName: string) =>{
    return this.capnhatChidao.controls[controlName].hasError(errorName);
  }

  public coverDate(dateData){
    var dateData0 = dateData;
    var dateData1 = dateData0.split("/");
    return dateData1[2]+"-"+dateData1[1]+"-"+dateData1[0];
  }

  showLightbox(index, imgURL) {
    this.imageObject = [{ image: imgURL}];
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

}
