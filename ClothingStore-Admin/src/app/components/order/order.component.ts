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
  allStatusOrder: any
  rows: any = [];
  allOrder: any
  displayedColumns: string[] = ['position', 'name', 'weight', "gia", "show", 'chinhsua', 'xoa'];
  dataSource: any;
  idTab: any
 isLoading=true



  constructor(private signInSerVice: SignInService, private dialog: MatDialog, private orderService: OrderService, private statusOrderService: StatusOrderService) { }
  @ViewChild('TablePaginator') TablePaginator: MatPaginator;

  ngOnInit(): void {

    this.getData()


  }
  getOrder($event: any) {
    this.isLoading=true
    this.allOrder=[]
    let id = this.allStatusOrder[$event.index].id
    this.idTab = id
    if (id == "1") {
      this.displayedColumns = ['position', 'name', 'weight', "gia", "show", 'chinhsua', 'xoa'];

      this.orderService.getOrderWaitConfirm()
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource = new MatTableDataSource(this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          this.isLoading=false
        })
    }
    if (id == "2") {
      this.displayedColumns = ['position', 'name', 'weight', "gia", "show", 'chinhsua', 'xoa'];

      this.orderService.getOrderDelivering()
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource = new MatTableDataSource(this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          this.isLoading=false
        })
    }
    if (id == "3") {
      this.displayedColumns = ['position', 'name', 'weight', "gia", "show"];
      this.orderService.getOrderDelivered()
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource = new MatTableDataSource(this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          this.isLoading=false
        })

    }
    if (id == "4") {
      this.displayedColumns = ['position', 'name', 'weight', "gia", "show"];
      this.orderService.getOrderCancle()
        .subscribe(res => {
          this.allOrder = res
          this.allOrder = this.allOrder.data
          this.dataSource = new MatTableDataSource(this.allOrder);
          this.dataSource.paginator = this.TablePaginator;
          this.isLoading=false
        })
    }

  }

  getData() {

    this.statusOrderService.getAllStatus()
      .subscribe(res => {
        this.allStatusOrder = res
        this.allStatusOrder = this.allStatusOrder.data

      })
  }


  confirmOrder(id: any) {

    Swal.fire({
      title: 'X??c nh???n ????n h??ng?',
      text: "????n h??ng chuy???n sang tr???ng th??i ??ang giao",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??c nh???n'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.confirmOrder({ id: id }).subscribe(res => {
          Swal.fire(
            '???? x??c nh???n!',
            '????n h??ng ??ang giao',
            'success'
          )
          this.orderService.getOrderWaitConfirm().subscribe(res => {
            this.orderService.getCountOrderWaitConfirm()
            this.allOrder = res
            this.allOrder = this.allOrder.data
            this.dataSource = new MatTableDataSource(this.allOrder);
            this.dataSource.paginator = this.TablePaginator;
          })
        })

      }
    })
  }
  cancleOrder(id: any) {

    Swal.fire({
      title: 'H???y ????n h??ng?',
      text: "????n h??ng s??? b??? h???y",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??c nh???n'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.cancleOrder({ id: id }).subscribe(res => {
          Swal.fire(
            '???? h???y!',
            '????n h??ng ???? b??? h???y',
            'success'
          )
          this.orderService.getOrderWaitConfirm().subscribe(res => {
            this.orderService.getCountOrderWaitConfirm()
            this.allOrder = res
            this.allOrder = this.allOrder.data
            this.dataSource = new MatTableDataSource(this.allOrder);
            this.dataSource.paginator = this.TablePaginator;
          })
        })

      }
    })
  }
  deliveredOrder(id: any) {

    Swal.fire({
      title: 'X??c nh???n ???? giao ????n h??ng?',
      text: "????n h??ng ???? giao",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??c nh???n'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deliveredOrder({ id: id }).subscribe(res => {
          Swal.fire(
            '???? giao!',
            '????n h??ng ???? giao',
            'success'
          )
          this.orderService.getOrderDelivering().subscribe(res => {
            this.allOrder = res
            this.allOrder = this.allOrder.data
            this.dataSource = new MatTableDataSource(this.allOrder);
            this.dataSource.paginator = this.TablePaginator;
          })
        })

      }
    })
  }
  showOrder(data: any) {
    this.dialog.open(ShowOrderComponent, {
      width: "800px",
      data: data,
    })
  }
}
