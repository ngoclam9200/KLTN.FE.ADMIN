import { Component, OnInit, ViewChild } from '@angular/core';
 import { MatTableDataSource } from '@angular/material/table';
 
 import { MatPaginator } from '@angular/material/paginator';
import { SignInService } from 'src/app/services/sign-in.service';

 
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  rows = [];
  displayedColumns: string[] = ['position', 'name', 'weight'];
  dataSource:any;
  constructor(private signInSerVice:SignInService) { }
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


}
