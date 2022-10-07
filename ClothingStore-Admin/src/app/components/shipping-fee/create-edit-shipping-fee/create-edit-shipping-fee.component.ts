import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShippingfeeService } from 'src/app/services/shippingfee.service';

@Component({
  selector: 'app-create-edit-shipping-fee',
  templateUrl: './create-edit-shipping-fee.component.html',
  styleUrls: ['./create-edit-shipping-fee.component.css']
})
export class CreateEditShippingFeeComponent implements OnInit {
 formGroup: FormGroup
 isSubmit:boolean=false
 
 distance:any=0
 distanceExist:boolean=false
 errtext:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private shippingfeeService: ShippingfeeService, private dialog :MatDialog) { }

  ngOnInit(): void {
     
    this.initForm()
    
  }
  // onchange()
  // {
     
  //   for(let i=0 ; i<10; i++)
  //   {
  //    if(this.to[i].value< this.formGroup.controls['from'].value || this.to[i].value ==this.formGroup.controls['from'].value)
  //     this.to[i].disabled= true
  //     else this.to[i].disabled= false
       
  //   }
     
    
  // }
  initForm() {
    if (!this.data.isEdit) {
      this.formGroup = new FormGroup({

        name: new FormControl(null, [Validators.required]),
         description: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
       
       

      });
    }
    else {
      this.formGroup = new FormGroup({
        id:new FormControl(this.data.data.id, [Validators.required]),
        price: new FormControl(this.data.data.price, [Validators.required]),
        description: new FormControl(this.data.data.description, [Validators.required]),
        // dateExpiration: new FormControl(this.data.data.dateExpiration, [Validators.required]),
        
       

      });
    }

  }
  createShippingFee()
  {
    this.isSubmit=true
     
    if(this.formGroup.valid)
    {
      
      this.shippingfeeService.createShippingFee(this.formGroup.value).subscribe(res=>{
       
        this.dialog.closeAll()
        
      },err=>{
        
        this.errtext=err
        this.errtext=this.errtext.error.message
        this.distanceExist=true
      })
      
    }
  }
  editShippingFee()
  {
    
    if(this.formGroup.valid)
    {
       this.shippingfeeService.editShippingFee(this.formGroup.value).subscribe(res=>{
       
        this.dialog.closeAll()
        
      },err=>{
        
        this.errtext=err
        this.errtext=this.errtext.error.message
        this.distanceExist=true
      })
      
    }
  }

}
