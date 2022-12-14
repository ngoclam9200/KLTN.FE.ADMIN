import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  formGroup: FormGroup;
  phonenumberValidate: boolean = true;
  usernameValidate: boolean = true;
  errorRes:any
  emailExist:boolean=true
  usernameExist:boolean=true
  constructor(private dialog:MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private customerService: CustomerService, private validateService: ValidateService) { }
  emailValidate: boolean = true
  Gender: any = ""

  ngOnInit(): void {
    
    this.initForm()
  }
  inputEmailChange()
  {
    this.emailValidate = this.validateService.ValidateEmail(this.formGroup.controls['email'].value)
  }
  inputPhoneNumberChange()
  {
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)

  }
  inputUserNameChange()
  {
    this.usernameValidate=this.validateService.validateUsername(this.formGroup.controls['username'].value)
  }
  initForm() {

    this.formGroup = new FormGroup({
      id: new FormControl(this.data.data.id, [Validators.required]),
      username: new FormControl(this.data.data.username, [Validators.required]),
      fullname: new FormControl(this.data.data.fullname, [Validators.required]),
      email: new FormControl(this.data.data.email, [Validators.required]),
      gender: new FormControl(this.data.data.gender, [Validators.required]),
      phonenumber: new FormControl(this.data.data.phonenumber, [Validators.required]),
      avatar: new FormControl(this.data.data.avatar, [Validators.required]),



    });







  }
  editCustomer() {

    this.emailValidate = this.validateService.ValidateEmail(this.formGroup.controls['email'].value)
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
    this.usernameValidate=this.validateService.validateUsername(this.formGroup.controls['username'].value)
    
    if(this.emailValidate && this.phonenumberValidate && this.usernameValidate )
    {
      this.customerService.editUser(this.formGroup.value).subscribe(res=>{
        
        Swal.fire(
          '???? ch???nh s???a!',
          'Ch???nh s???a th??ng tin ng?????i d??ng th??nh c??ng',
          'success'
        )
        this.dialog.closeAll()

        

      },err=>
      {
        this.errorRes=err
        this.errorRes=this.errorRes.error.message
         
        if(this.errorRes=="Email ???? t???n t???i, vui l??ng th??? email kh??c") this.emailExist=false
        if(this.errorRes=="T??n ????ng nh???p ???? t???n t???i, vui l??ng th??? t??n kh??c") this.usernameExist=false
      })
    }


  }

}
