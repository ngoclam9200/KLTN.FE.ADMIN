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
    console.log(this.usernameValidate);
    
    if(this.emailValidate && this.phonenumberValidate && this.usernameValidate )
    {
      this.customerService.editUser(this.formGroup.value).subscribe(res=>{
        
        Swal.fire(
          'Đã chỉnh sửa!',
          'Chỉnh sửa thông tin người dùng thành công',
          'success'
        )
        this.dialog.closeAll()

        

      },err=>
      {
        this.errorRes=err
        this.errorRes=this.errorRes.error.message
         
        if(this.errorRes=="Email đã tồn tại, vui lòng thử email khác") this.emailExist=false
        if(this.errorRes=="Tên đăng nhập đã tồn tại, vui lòng thử tên khác") this.usernameExist=false
      })
    }


  }

}
