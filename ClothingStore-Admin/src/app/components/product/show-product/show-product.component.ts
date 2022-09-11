import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditProductComponent } from '../create-edit-product/create-edit-product.component';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

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
