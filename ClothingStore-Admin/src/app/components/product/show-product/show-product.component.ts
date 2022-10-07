import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEditProductComponent } from '../create-edit-product/create-edit-product.component';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  openEditProduct()
  { this.dialog.closeAll()
    this.dialog.open(CreateEditProductComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin sản phẩm "
      }
    })
  }
}
