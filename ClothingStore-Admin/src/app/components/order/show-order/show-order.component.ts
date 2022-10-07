import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  estimateDelivery(date: any) {
    var day = new Date(date)
   
    var estimate = day.getFullYear() + "-" + (day.getMonth() + 1).toString() + "-" + (day.getDate() + 3).toString()
    return estimate

  }

}
