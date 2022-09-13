import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-shipping-fee',
  templateUrl: './create-edit-shipping-fee.component.html',
  styleUrls: ['./create-edit-shipping-fee.component.css']
})
export class CreateEditShippingFeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
