import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-typeof-voucher',
  templateUrl: './typeof-voucher.component.html',
  styleUrls: ['./typeof-voucher.component.css']
})
export class TypeofVoucherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
