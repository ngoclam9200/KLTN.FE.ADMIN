import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-voucher',
  templateUrl: './create-edit-voucher.component.html',
  styleUrls: ['./create-edit-voucher.component.css']
})
export class CreateEditVoucherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
