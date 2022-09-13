import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
import { CreateEditVoucherComponent } from './create-edit-voucher/create-edit-voucher.component';
import { ShowVoucherComponent } from './show-voucher/show-voucher.component';
import { TypeofVoucherComponent } from './typeof-voucher/typeof-voucher.component';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  rows:any = [];
  displayedColumns: string[] = ['image', 'name', 'code',"count",'show','chinhsua', 'xoa'];
  dataSource:any;
  constructor(private signInSerVice:SignInService, private dialog : MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.fetch((data) => {
      this.rows = data;
      this.dataSource = new MatTableDataSource(this.rows);
      this.dataSource.paginator = this.paginator;
   
     
    });
  }
  fetch(cb: { (data: any): void; (arg0: any): void; }) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://swimlane.github.io/ngx-datatable/assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }
 
  openAlertDelete()
  {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  openCreateVoucher()
  {
    this.dialog.open(CreateEditVoucherComponent, {
      width: '700px',
      data:{
        textBtn:"Thêm",
        title: "Thêm voucher"
      }
    })
  }
  openCreateTypeofVoucher()
  {
    this.dialog.open(TypeofVoucherComponent, {
      width: '700px',
      data:{
        textBtn:"Thêm",
        title: "Thêm loại voucher"
      }
    })
  }
  openEditVoucher()
  {
    this.dialog.open(CreateEditVoucherComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin voucher"
      }
    })
  }
  openShowVoucher()
  {
    this.dialog.open(ShowVoucherComponent)
  }
  
}
