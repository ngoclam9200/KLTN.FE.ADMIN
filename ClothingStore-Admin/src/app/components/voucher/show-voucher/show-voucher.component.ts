import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-show-voucher',
  templateUrl: './show-voucher.component.html',
  styleUrls: ['./show-voucher.component.css']
})
export class ShowVoucherComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private voucherService:VoucherService, private dialog :MatDialog) { }


  ngOnInit(): void {
   }

}
