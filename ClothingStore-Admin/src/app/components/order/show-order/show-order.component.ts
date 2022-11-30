import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderDetailService } from 'src/app/services/order-detail.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {
  allProduct:any
displayedColumns= ['position', 'name', 'weight'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private orderDetailService :OrderDetailService) { }

  ngOnInit(): void {
   
    
     this.getProductInOrder()
  }
  estimateDelivery(date: any) {
    var day = new Date(date)
   
    var estimate = day.getFullYear() + "-" + (day.getMonth() + 1).toString() + "-" + (day.getDate() + 3).toString()
    return estimate

  }
  getProductInOrder()
  {
    this.orderDetailService.getOrderDetailByOrderId(this.data.id).subscribe(res=>{
       this.allProduct=res

      this.allProduct=this.allProduct.data
     })
  }

}
