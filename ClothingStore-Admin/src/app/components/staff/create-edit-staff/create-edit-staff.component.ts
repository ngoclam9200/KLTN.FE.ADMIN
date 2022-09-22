import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StaffService } from 'src/app/services/staff.service';
 import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-staff',
  templateUrl: './create-edit-staff.component.html',
  styleUrls: ['./create-edit-staff.component.css']
})
export class CreateEditStaffComponent implements OnInit {
  
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,
   private validateService : ValidateService, private staffService: StaffService,
   private dialog:MatDialog) { }
  formGroup: FormGroup;
  phonenumberValidate: boolean = true;
  usernameValidate: boolean = true;
  errorRes:any
  emailExist:boolean=true
  usernameExist:boolean=true
  emailValidate: boolean = true
  passwordValidate: boolean = true
  isconfirmpassword: boolean=true
  confirmpass:string=""
  Gender: any = ""
  isSubmit:boolean=false
  hide = true;
  ngOnInit(): void {
    this.initForm()
    
    
  }
  initForm() {
    if (!this.data.isEdit) {
      this.formGroup = new FormGroup({

        fullname: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        phonenumber: new FormControl(null, [Validators.required]),
        salary: new FormControl(null, [Validators.required]),
        gender: new FormControl(null, [Validators.required]),

      });
    }
    else {
      this.formGroup = new FormGroup({

        fullname: new FormControl(this.data.data.fullname, [Validators.required]),
        username: new FormControl(this.data.data.username, [Validators.required]),
        id: new FormControl(this.data.data.id, [Validators.required]),
        email: new FormControl(this.data.data.email, [Validators.required]),
        phonenumber: new FormControl(this.data.data.phonenumber, [Validators.required]),
        salary: new FormControl(this.data.data.salary, [Validators.required]),
        gender: new FormControl(this.data.data.gender, [Validators.required]),
        avatar: new FormControl(this.data.data.avatar, [Validators.required]),

      });
    }

  }
  // test()
  // {
  //   console.log(this.validate.validateUsername(this.formGroup.controls['tenDangNhap'].value))

  // }
  editStaff() {

    this.emailValidate = this.validateService.ValidateEmail(this.formGroup.controls['email'].value)
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
    this.usernameValidate=this.validateService.validateUsername(this.formGroup.controls['username'].value)
   

    
    if(this.emailValidate && this.phonenumberValidate && this.usernameValidate   )
    {
      this.staffService.editStaff(this.formGroup.value).subscribe(res=>{
        
        Swal.fire(
          'Đã chỉnh sửa!',
          'Chỉnh sửa thông tin nhân viên thành công',
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
  
  createStaff() {
    this.isSubmit=true
    this.emailValidate = this.validateService.ValidateEmail(this.formGroup.controls['email'].value)
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
    this.usernameValidate=this.validateService.validateUsername(this.formGroup.controls['username'].value)
    
   
    this.passwordValidate=this.validateService.ValidatePassword(this.formGroup.controls['password'].value)
    if(this.passwordValidate  )
    {
      
      this.isconfirmpassword=this.validateService.confirmPassw(this.formGroup.controls['password'].value,this.confirmpass)
    }
    
    console.log(this.isconfirmpassword);
   
 
 
    
 

    
    if(this.emailValidate && this.phonenumberValidate && this.usernameValidate && this.isconfirmpassword && this.passwordValidate)
    {
      // this.formGroup.controls['salary'].setValue(this.formGroup.controls['salary'].value.toString())
      console.log(this.formGroup.value)
      this.staffService.createStaff(this.formGroup.value).subscribe(res=>{
        
        Swal.fire(
          'Đã thêm!',
          'Thêm thông tin  nhân viên thành công',
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
