import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShippingfeeService } from 'src/app/services/shippingfee.service';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
import { CreateEditShippingFeeComponent } from './create-edit-shipping-fee/create-edit-shipping-fee.component';

@Component({
  selector: 'app-shipping-fee',
  templateUrl: './shipping-fee.component.html',
  styleUrls: ['./shipping-fee.component.css']
})
export class ShippingFeeComponent implements OnInit {

  rows: any = [];
  displayedColumns: string[] = ['name', 'price/1km', 'distance', 'chinhsua', ];
  dataSource: any;
  dataResponse: any;
  allVoucher: any
  notfound: boolean = false
  search: any = ""
  constructor(private signInSerVice: SignInService, private dialog: MatDialog, private shippingfeeService: ShippingfeeService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.getAllShippingFee()
  }
  getAllShippingFee() {
    this.shippingfeeService.getAllShippingFee().subscribe(res => {
      this.dataResponse = res
      this.allVoucher = this.dataResponse.data
      this.dataSource = new MatTableDataSource(this.allVoucher);
      this.dataSource.paginator = this.paginator;
    })
  }

  openAlertDeleteShippingFee(id: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Phí ship này sẽ bị xóa , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa phí ship!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.shippingfeeService.deleteShippingFee(id).subscribe(res => {
          Swal.fire(
            'Đã xóa!',
            'Phí ship này đã được xóa.',
            'success'
          )
          this.getAllShippingFee()
        })
  
      }
    })
  }
  

 
  openCreateShippingFee()
  {
   const dialogRef= this.dialog.open(CreateEditShippingFeeComponent, {
      width: '700px',
      
        data:{
          textBtn: "Thêm",
          title: "Thêm phí vận chuyển",
          isEdit:false,
          
        }
      
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllShippingFee()
    })
  }

  openEditShippingFee(data:any) {
   const dialogRef= this.dialog.open(CreateEditShippingFeeComponent, {
      width: '700px',
      data: {
        textBtn: "Chỉnh sửa",
        title: "Chỉnh sửa thông tin phí vận chuyển",
        isEdit:true,
        data:data
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllShippingFee()
    })
  }



}
