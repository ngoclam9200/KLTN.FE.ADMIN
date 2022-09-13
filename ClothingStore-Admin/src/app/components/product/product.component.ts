import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
import { ShowStaffComponent } from '../staff/show-staff/show-staff.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  rows:any = [];
  displayedColumns: string[] = ['image', 'name', 'price',"count",'show','chinhsua', 'xoa'];
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

  openCreateProduct()
  {
    this.dialog.open(CreateEditProductComponent, {
      width: '700px',
      data:{
        textBtn:"Thêm",
        title: "Thêm sản phẩm"
      }
    })
  }
  openEditProduct()
  {
    this.dialog.open(CreateEditProductComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin sản phẩm"
      }
    })
  }
  openShowProduct()
  {
    this.dialog.open(ShowStaffComponent)
  }
}
