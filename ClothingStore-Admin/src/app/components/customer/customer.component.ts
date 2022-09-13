import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/alert.service';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
// import { CreateEditCustomerComponent } from './create-edit-customer/create-edit-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ShowCustomerComponent } from './show-customer/show-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  rows:any = [];
  displayedColumns: string[] = ['fullname','email','phonenumber', 'avatar', 'show','chinhsua', 'xoa'];
  dataSource:any;
  constructor(private signInSerVice:SignInService, private dialog : MatDialog, private alertService :AlertService) { }
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
  
  
  
  openEditCustomer()
  {
    this.dialog.open(EditCustomerComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin khách hàng"
      }
    })
  }
  openShowCustomer()
  {
    this.dialog.open(ShowCustomerComponent, {
      width: '700px',
       
    })
  }
  openAlertDelete()
  {
    this.alertService.openAlertDelete()
  }



}
