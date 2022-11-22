import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThemYKienChiDaoService } from '../Service/them-ykien-chi-dao.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotificationService } from '../Service/notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf, Subject} from 'rxjs';
import {catchError, map, startWith, switchMap, takeUntil} from 'rxjs/operators';
import { IncomingOfficialDispatch } from '../models/incoming-official-dispatch';
import {MatDialog} from '@angular/material/dialog';
import { ThemYKienChiDaoDialogComponent } from '../them-ykien-chi-dao-dialog/them-ykien-chi-dao-dialog.component';
import { XuLyVanBanService } from '../Service/xu-ly-van-ban.service';
import { ThemTienDoThucHienDialogComponent } from '../them-tien-do-thuc-hien-dialog/them-tien-do-thuc-hien-dialog.component';
import { CapNhatTienDoThucHienComponent } from '../cap-nhat-tien-do-thuc-hien/cap-nhat-tien-do-thuc-hien.component';
import { XacNhanXoaTienDoThucHienComponent } from '../xac-nhan-xoa-tien-do-thuc-hien/xac-nhan-xoa-tien-do-thuc-hien.component';
import { ThemDaThucHienComponent } from '../them-da-thuc-hien/them-da-thuc-hien.component';
import { CapNhatDaThucHienComponent } from '../cap-nhat-da-thuc-hien/cap-nhat-da-thuc-hien.component';
import { XoaDaThucHienComponent } from '../xoa-da-thuc-hien/xoa-da-thuc-hien.component';
import { ThongKeService } from '../Service/thong-ke.service';
import { ThemYKienChiDaoTKComponent } from '../them-ykien-chi-dao-tk/them-ykien-chi-dao-tk.component';

@Component({
  selector: 'app-tra-cuu-van-ban',
  templateUrl: './tra-cuu-van-ban.component.html',
  styleUrls: ['./tra-cuu-van-ban.component.scss']
})
export class TraCuuVanBanComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private xulyvanbanService: XuLyVanBanService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private config: NgSelectConfig,
    private notifyService : NotificationService,
    public dialog: MatDialog,
    private thongkeService: ThongKeService,
  ) {
    this.config.notFoundText = 'Không có kết quả tìm kiếm';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  }

  VanBanChiDao: IncomingOfficialDispatch[] = [];
  dataSource = new MatTableDataSource<IncomingOfficialDispatch>(this.VanBanChiDao);
  dangthuchien: any[] = [];
  dathuchien: any[] = [];
  ykienchidao: any[] = [];
  vanbanden: any[] = [];
  filetiendothuchien: any[] = [];
  isLoadingResults = true;
  urlFile = this.authService.apiURL+'/generate-pdf/';
  selection = new SelectionModel<IncomingOfficialDispatch>(true, []);
  displayedColumns: string[] = ['select', 'VanBanDen', 'DangThucHien', 'DaThucHien','TrangThai','YKienChiDao'];
  urlChitietHinhanhTT = this.authService.apiURL+'/storage/';
  statusSelected = '1';
  thongkeVB: FormGroup;
  canbothuchien: any[] = [];
  nguoithuchienvb: any[] = [];
  public timkiemCBTH: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  protected tmpCBTH: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Số lượng dòng hiển thị: ';
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 Trên tổng ${length }`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} Trên tổng ${length}`;
    };
  }

  ngOnInit(): void {
    this.thongkeVB = this.fb.group({
      NgayBD: ['', Validators.required],
      NgayKT: ['', Validators.required],
      CBThucHien: [, Validators.required],
    });
    this.xulyvanbanService.getDocuments().subscribe({
      next: (data) => {
        //this.dulieuxuly = data;
        console.log(data);
        this.vanbanden = data[0];
        this.dangthuchien = data[3];
        this.filetiendothuchien = data[4];
        this.dathuchien = data[7];
        this.ykienchidao = data[5];
        this.canbothuchien = data[12];
        this.tmpCBTH = data[12];
        this.nguoithuchienvb = data[6];
        this.dataSource = new MatTableDataSource<IncomingOfficialDispatch>(data[0]);
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false;
      },
      error: (error) => {
        //window.location.reload();
        this.xulyvanbanService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {}
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
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: IncomingOfficialDispatch): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.DocumentID + 1}`;
  }

  tiendoThuchien(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);

    const dialogRef = this.dialog.open(ThemTienDoThucHienDialogComponent,{
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      // hasBackdrop: true,
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  capnhatTiendoThuchien(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);
    const fileTD = [];
    this.filetiendothuchien.forEach(filetdth => {
      if(row.id == filetdth.ProgressID && filetdth.namePF1 != null && filetdth.pathPF1 != null){
        fileTD.push(filetdth);
      }
    });

    const dialogRef = this.dialog.open(CapNhatTienDoThucHienComponent,{
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      // hasBackdrop: true,
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon, fileTD},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  xoaTiendoThuchien(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);

    const dialogRef = this.dialog.open(XacNhanXoaTienDoThucHienComponent,{
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      // hasBackdrop: true,
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  daThuchien(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);

    const dialogRef = this.dialog.open(ThemDaThucHienComponent,{
      // backdropClass: 'cdk-overlay-transparent-backdrop',
      // hasBackdrop: true,
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  capnhatHoanthanh(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);

    const dialogRef = this.dialog.open(CapNhatDaThucHienComponent,{
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  xoaHoanthanh(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);

    const dialogRef = this.dialog.open(XoaDaThucHienComponent,{
      width: '70vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  statusChange(event){
    this.statusSelected = event.value;
    if(this.statusSelected == '1'){
      this.thongkeVB.get('NgayBD').setValue(null);
      this.thongkeVB.get('NgayKT').setValue(null);
      this.thongkeVB.get('CBThucHien').setValue(null);
    }
  }

  thongkeYKCD(){
    var CBThucHien = [];

    if((this.thongkeVB.get('CBThucHien').value) != null){
      CBThucHien = this.thongkeVB.get('CBThucHien').value;
    }

    var formData: any = new FormData();
    formData.append("trangthai", this.statusSelected);
    formData.append("NgayBD", this.thongkeVB.get('NgayBD').value);
    formData.append("NgayKT", this.thongkeVB.get('NgayKT').value);
    formData.append("CBThucHien", JSON.stringify(CBThucHien));
    formData.append('_method', 'POST');
    this.isLoadingResults = true;
    this.thongkeService.getStatistical(formData).subscribe({
      next: (data) => {
        this.vanbanden = data[0];
        this.dangthuchien = data[3];
        this.filetiendothuchien = data[4];
        this.dathuchien = data[7];
        this.ykienchidao = data[5];
        this.canbothuchien = data[12];
        this.tmpCBTH = data[12];
        this.nguoithuchienvb = data[6];
        this.dataSource = new MatTableDataSource<IncomingOfficialDispatch>(data[0]);
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = false;
      },
      error: (error) => {
        this.thongkeService.showToasterError('','Lỗi dữ liệu!');
      },
      complete: () => {

      }
    });
  }

  public hasError = (controlName: string, errorName: string) =>{
    return this.thongkeVB.controls[controlName].hasError(errorName);
  }

  themYKCD(row){
    const dulieuchon: any[] = [];
    dulieuchon.push(row);

    const dialogRef = this.dialog.open(ThemYKienChiDaoTKComponent,{
      width: '90vw',
      maxWidth: '90vw',
      maxHeight: '95vh',
      data: {dulieuchon},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
