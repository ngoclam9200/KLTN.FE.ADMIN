import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  rows:any = [];
  displayedColumns: string[] = ['position', 'name', 'weight',"show",'chinhsua', 'xoa'];
  dataSourceWaitConfirm:any;
  dataSourceDelivering:any;
  dataSourceDelivered:any;
  dataSourceCancle:any;

  

  constructor(private signInSerVice:SignInService, private dialog : MatDialog) { }
  @ViewChild('TableWaitConfirmPaginator') TableWaitConfirmPaginator: MatPaginator;
  @ViewChild('TableDeliveringPaginator', {static: true}) TableDeliveringPaginator: MatPaginator;
  @ViewChild('TableDeliveredPaginator', {static: true}) TableDeliveredPaginator: MatPaginator;
  @ViewChild('TableCanclePaginator', {static: true}) TableCanclePaginator: MatPaginator;
  ngOnInit(): void {
    
    this.fetch((data) => {
      this.rows = data;
      this.dataSourceWaitConfirm = new MatTableDataSource(this.rows);
      this.dataSourceWaitConfirm.paginator = this.TableWaitConfirmPaginator;
      // this.rows1 = data;
      this.dataSourceDelivering = new MatTableDataSource(this.rows);
      this.dataSourceDelivering.paginator = this.TableDeliveringPaginator;
      //
      this.dataSourceDelivered = new MatTableDataSource(this.rows);
      this.dataSourceDelivered.paginator = this.TableDeliveredPaginator;
     //
     this.dataSourceCancle = new MatTableDataSource(this.rows);
      this.dataSourceCancle.paginator = this.TableCanclePaginator;
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


}
