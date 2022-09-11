import { Component, OnInit, ViewChild } from '@angular/core';
 import { MatTableDataSource } from '@angular/material/table';
 
 import { MatPaginator } from '@angular/material/paginator';
import { SignInService } from 'src/app/services/sign-in.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateEditStaffComponent } from './create-edit-staff/create-edit-staff.component';
import { AlertService } from 'src/app/services/alert.service';
import { ShowStaffComponent } from './show-staff/show-staff.component';
 
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  rows:any = [];
  displayedColumns: string[] = ['position', 'name', 'weight',"show",'chinhsua', 'xoa'];
  dataSource:any;
  constructor(private signInSerVice:SignInService, private dialog : MatDialog, private alertService: AlertService) { }
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
  openCreateStaff()
  {
    this.dialog.open(CreateEditStaffComponent, {
      width: '700px',
      data:{
        textBtn:"Tạo",
        title: "Thêm nhân viên"
      }
    })
  }
  openEditStaff()
  {
    this.dialog.open(CreateEditStaffComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin nhân viên"
      }
    })
  }
  openShowStaff()
  {
    this.dialog.open(ShowStaffComponent, {
      width: '700px',
       
    })
  }
  openAlertDelete()
  {
    this.alertService.openAlertDelete()
  }


}
