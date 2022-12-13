import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SignInService } from 'src/app/services/sign-in.service';
import { VoucherService } from 'src/app/services/voucher.service';
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
  displayedColumns: string[] = ['code', 'discountprice', 'discountfreeship',"amountremaining",'show','chinhsua', 'xoa'];
  dataSource:any;
  dataResponse:any;
  allVoucher: any
  notfound:boolean=false
  search:any=""
  isLoading=true
  constructor(private signInSerVice:SignInService, private dialog : MatDialog, private voucherService: VoucherService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.getAllVoucher()
    // this.fetch((data) => {
    //   this.rows = data;
    //   this.dataSource = new MatTableDataSource(this.rows);
    //   this.dataSource.paginator = this.paginator;
   
     
    // });
  }
   
 getAllVoucher()
 {
this.voucherService.getAllVoucher().subscribe(res=> {
   this.dataResponse = res
  this.allVoucher= this.dataResponse.data
   
  if(this.allVoucher.length==0) this.notfound=true
  this.dataSource = new MatTableDataSource(this.allVoucher);
  this.dataSource.paginator = this.paginator;
  this.isLoading=false
})

 }
 openAlertDeleteVoucher(id: any) {
  Swal.fire({
    title: 'Bạn có chắc chắn muốn xóa?',
    text: "Voucher này sẽ bị xóa , bạn không thể hoàn tác!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa voucher!'
  }).then((result) => {
    if (result.isConfirmed) {
      this.voucherService.deleteVoucher(id).subscribe(res => {
        Swal.fire(
          'Đã xóa!',
          'Voucher này đã được xóa.',
          'success'
        )
        this.getAllVoucher()
      })

    }
  })
}

  openCreateVoucher()
  {
   const dialogRef= this.dialog.open(CreateEditVoucherComponent, {
      width: '700px',
      
        data:{
          textBtn:"Thêm ",
          title: "Thêm voucher",
          isEdit:false,
          
        }
      
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllVoucher()
    })
  }
  
  openEditVoucher(data:any)
  {
    if(data.discountprice>0) 
    {
      var isEditDiscountprice=true
    }
    else isEditDiscountprice=false;
   const dialogRef= this.dialog.open(CreateEditVoucherComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin voucher",
        isEdit: true,
        isEditDiscountprice: isEditDiscountprice,
        
        data:data
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllVoucher()
    })
  }
  openShowVoucher(data:any)
  {
    this.dialog.open(ShowVoucherComponent, {data:data})
  }
  searchVoucher()
  {
    if(this.search!="")
    {
      this.voucherService.searchVoucher(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data==null) this.notfound=true
        else
        {
          this.allVoucher = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allVoucher);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllVoucher()
      this.notfound=false
    }
  }
  onChangeTextSearchEvent()
  {
    if(this.search!="")
    {
      this.voucherService.searchVoucher(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data!=null) 
        {
         
          this.allVoucher = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allVoucher);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllVoucher()
      this.notfound=false
    }
  }
  
}
