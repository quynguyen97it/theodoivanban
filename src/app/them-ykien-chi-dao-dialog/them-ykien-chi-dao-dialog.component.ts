import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import { FileValidator } from 'ngx-material-file-input';

@Component({
  selector: 'app-them-ykien-chi-dao-dialog',
  templateUrl: './them-ykien-chi-dao-dialog.component.html',
  styleUrls: ['./them-ykien-chi-dao-dialog.component.scss']
})
export class ThemYKienChiDaoDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IncomingOfficialDispatch,
    private themykienchidaoService: ThemYKienChiDaoService,
    private fb: FormBuilder,

  ) { console.log(this.data);}
  @ViewChild('multiSelect') multiSelect: MatSelect;
  ngOnInit(): void {
    this.duyetYKCD = this.fb.group({
      SoKyHieuVanBan: ['', Validators.required],
      eNgayVBDen: ['', Validators.required],
      NgayBanHanh: ['', Validators.required],
      eCoQuanBanHanh: [''],
      TrichYeuVanBan: ['', Validators.required],
      ThoiGianHetHan: ['', Validators.required],
      fileTomtatCD: [undefined,[FileValidator.maxContentSize(this.maxSize)]],
      TTYKienChiDao: [''],
      CBThucHien: [, Validators.required],
      CBPhoiHop: [],
    });

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
  canbothuchien: any[] = this.data['cbth'];
  canbophoihop: any[] = this.data['cbph'];
  public timkiemCBTH: FormControl = new FormControl();
  public timkiemCBPH: FormControl = new FormControl();
  protected tmpCBTH: string[] = this.canbothuchien;
  protected tmpCBPH: string[] = this.canbophoihop;

  duyetVBChiDao(){

  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.duyetYKCD.controls[controlName].hasError(errorName);
  }

}