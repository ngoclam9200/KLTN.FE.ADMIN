import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
import { ShowStaffComponent } from '../staff/show-staff/show-staff.component';
import { CreateEditProductComponent } from './create-edit-product/create-edit-product.component';
import { EditImageProductComponent } from './edit-image-product/edit-image-product.component';
import { ShowProductComponent } from './show-product/show-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  rows:any = [];
  displayedColumns: string[] = ['image', 'name', 'price',"count",'show','chinhsua', 'xoa'];
  dataSource:any;
  dataResponse: any;
  allProduct: any;
  search:any="";
  notfound:boolean=false
  constructor(private signInSerVice:SignInService, private dialog : MatDialog, private productService: ProductService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
     
    this.getAllProduct()
  }
  searchProduct()
  {
    if(this.search!="")
    {
      this.productService.searchProduct(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data==null) this.notfound=true
        else
        {
          this.allProduct = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allProduct);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllProduct()
      this.notfound=false
    }
  }
  onChangeTextSearchEvent()
  {
    if(this.search!="")
    {
      this.productService.searchProduct(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data!=null) 
        {
         
          this.allProduct = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allProduct);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllProduct()
      this.notfound=false
    }
  }
  getAllProduct()
  {
    this.productService.getAllProduct().subscribe(res=>{
      this.dataResponse = res
      this.allProduct = this.dataResponse.data
      this.dataSource = new MatTableDataSource(this.allProduct);
      this.dataSource.paginator = this.paginator;
    })
  }
 
  openAlertDeleteCategory(id: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Sản phẩm sẽ bị xóa , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa sản phẩm!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(id).subscribe(res => {
          Swal.fire(
            'Đã xóa!',
            'Sản phẩm  này đã được xóa.',
            'success'
          )
          this.getAllProduct()
        })

      }
    })
  }

  openCreateProduct()
  {
   const dialogRef= this.dialog.open(CreateEditProductComponent, {
      width: '700px',
      data:{
        textBtn:"Thêm",
        title: "Thêm sản phẩm", 
        isEdit: false
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllProduct()
    })
  }
  openEditProduct(data:any)
  {
  const dialogRef=this.dialog.open(CreateEditProductComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin sản phẩm", 
        isEdit: true,
        data:data
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllProduct()
    })
  }
  openEditImageProduct(data:any)
  {
  const dialogRef=this.dialog.open(EditImageProductComponent, {
      width: '700px',
      height:"670px",
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin sản phẩm", 
        isEdit: true,
        data:data
      }
    })
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllProduct()
    })
  }
  openShowProduct(data:any)
  {
    this.dialog.open(ShowProductComponent,{
      width: '700px',
      data:data
    })
  }
}
