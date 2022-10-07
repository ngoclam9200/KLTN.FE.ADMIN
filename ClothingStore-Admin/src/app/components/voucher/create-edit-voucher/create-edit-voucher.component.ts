import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-create-edit-voucher',
  templateUrl: './create-edit-voucher.component.html',
  styleUrls: ['./create-edit-voucher.component.css']
})
export class CreateEditVoucherComponent implements OnInit {
  formGroup: FormGroup;
  typeOfVoucher:any="price"
  minDate: Date;
  isSubmit:boolean=false
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private voucherService:VoucherService, private dialog :MatDialog) { }

  ngOnInit(): void {
     this.initForm()
    this.minDate=new Date()
   
  }
  initForm() {
    if (!this.data.isEdit) {
      this.formGroup = new FormGroup({

        code: new FormControl(null, [Validators.required]),
        discountprice: new FormControl(null, [Validators.required]),
        discountfreeship: new FormControl(null, [Validators.required]),
        dateExpiration: new FormControl(null, [Validators.required]),
        amountInput: new FormControl(null, [Validators.required]),
       

      });
    }
    else {
      this.formGroup = new FormGroup({
        id:new FormControl(this.data.data.id, [Validators.required]),
        discountprice: new FormControl(this.data.data.discountprice, [Validators.required]),
        discountfreeship: new FormControl(this.data.data.discountfreeship, [Validators.required]),
        dateExpiration: new FormControl(this.data.data.dateExpiration, [Validators.required]),
        
       

      });
    }

  }
  percentValidate(percent : number)
  {
    if (percent>0 && percent>100) return false
    else return true
  }
  createVoucher()
  { 
    if(this.typeOfVoucher=="price") this.formGroup.controls['discountfreeship'].setValue(0)
    else this.formGroup.controls['discountprice'].setValue(0)
    var code = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   
    for (var i = 0; i < 6; i++)
      code += possible.charAt(Math.floor(Math.random() * possible.length));
      this.formGroup.controls['code'].setValue(code)
     this.isSubmit=true
    if(this.formGroup.valid)
    {
      this.voucherService.createVoucher(this.formGroup.value).subscribe(res=>{
         this.dialog.closeAll()
      })
    }
  }
  editVoucher()
  {
    this.isSubmit=true
     if(this.data.isEditDiscountprice)
    {
      if(this.formGroup.valid && this.percentValidate(this.formGroup.controls['discountprice'].value))
      {
        this.voucherService.editVoucher(this.formGroup.value).subscribe(res=>{
           this.dialog.closeAll()
        })
      }
       

    }
    else
    {
      if(this.formGroup.valid && this.percentValidate(this.formGroup.controls['discountfreeship'].value))
      {
        this.voucherService.editVoucher(this.formGroup.value).subscribe(res=>{
           this.dialog.closeAll()
        })
      }
    }
    
  }
  
}
