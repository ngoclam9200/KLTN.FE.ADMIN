import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { SignInService } from 'src/app/services/sign-in.service';
import { StatusOrderService } from 'src/app/services/status-order.service';
import Swal from 'sweetalert2';
import { ShowOrderComponent } from './show-order/show-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
allStatusOrder:any
  rows:any = [];
  allOrder:any
  displayedColumns: string[] = ['position', 'name', 'weight', "gia","show",'chinhsua', 'xoa'];
  dataSource :any;
  idTab:any
   
  

  constructor(private signInSerVice:SignInService, private dialog : MatDialog,private orderService:OrderService, private statusOrderService: StatusOrderService) { }
  @ViewChild('TablePaginator') TablePaginator: MatPaginator;
  
  ngOnInit(): void {
   
    this.getData()
    
    
  }
  getOrder($event: any) {
    let id = this.allStatusOrder[$event.index].id
    this.idTab=id
    if (id == "1") {
  this.displayedColumns= ['position', 'name', 'weight', "gia","show",'chinhsua', 'xoa'];

      this.orderService.getOrderWaitConfirm()
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource  = new MatTableDataSource( this.allOrder);
        this.dataSource.paginator = this.TablePaginator;
        })
    }
    if (id == "2") {
  this.displayedColumns= ['position', 'name', 'weight', "gia","show",'chinhsua', 'xoa'];

      this.orderService.getOrderDelivering( )
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource  = new MatTableDataSource( this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
        })
    }
    if (id == "3") {
      this.displayedColumns = ['position', 'name', 'weight', "gia","show"];
      this.orderService.getOrderDelivered( )
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource  = new MatTableDataSource( this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
        })

    }
    if (id == "4") {
      this.displayedColumns = ['position', 'name', 'weight', "gia","show"];
      this.orderService.getOrderCancle( )
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource  = new MatTableDataSource( this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
        })
    }

  }
  
  getData ()
  {
    
    this.statusOrderService.getAllStatus()
    .subscribe(res=>{
      this.allStatusOrder=res
      this.allStatusOrder=this.allStatusOrder.data
      
    })
  }
  
   
  confirmOrder(id:any)
  {
     
    Swal.fire({
      title: 'Xác nhận đơn hàng?',
      text: "Đơn hàng chuyển sang trạng thái đang giao",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.confirmOrder({id:id}).subscribe(res=>{
          Swal.fire(
            'Đã xác nhận!',
            'Đơn hàng đang giao',
            'success'
          )
          this.orderService.getOrderWaitConfirm().subscribe(res=>{
            this.allOrder = res
            this.allOrder = this.allOrder.data
            this.dataSource  = new MatTableDataSource( this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          })
        })
       
      }
    })
  }
  cancleOrder(id:any)
  {
     
    Swal.fire({
      title: 'Hủy đơn hàng?',
      text: "Đơn hàng sẽ bị hủy",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancleOrder({id:id}).subscribe(res=>{
          Swal.fire(
            'Đã hủy!',
            'Đơn hàng đã bị hủy',
            'success'
          )
          this.orderService.getOrderWaitConfirm().subscribe(res=>{
            this.allOrder = res
            this.allOrder = this.allOrder.data
            this.dataSource  = new MatTableDataSource( this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          })
        })
       
      }
    })
  }
  deliveredOrder(id:any)
  {
     
    Swal.fire({
      title: 'Xác nhận đã giao đơn hàng?',
      text: "Đơn hàng đã giao",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deliveredOrder({id:id}).subscribe(res=>{
          Swal.fire(
            'Đã giao!',
            'Đơn hàng đã giao',
            'success'
          )
          this.orderService.getOrderDelivering().subscribe(res=>{
            this.allOrder = res
            this.allOrder = this.allOrder.data
            this.dataSource  = new MatTableDataSource( this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          })
        })
       
      }
    })
  }
showOrder(data:any)
{
 this.dialog.open(ShowOrderComponent, {
  width:"800px",
  data:data,
 })
}
}
