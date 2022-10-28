import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { StaffService } from 'src/app/services/staff.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private adminService: AdminService, private staffService: StaffService,
    private validateService: ValidateService, private dialog: MatDialog) { }
  data: any
  isSubmit: boolean = false
  phonenumberValidate: boolean = true;
  formGroup: FormGroup
  ngOnInit(): void {
     
    this.initForm()
    this.getData()
  }
  getData() {
    if(localStorage.getItem("isLoginAdmin")=="true")
    {
      this.adminService.getadminById(localStorage.getItem("adminId")).subscribe(res=>
        {
          this.data=res
          this.data=this.data.data
          this.initForm()
        })
        this.adminService.avatar.subscribe(res=>{
          this.data.avatar=res
        })
    }
    if(localStorage.getItem("isLoginStaff")=="true")
    {
      this.staffService.getstaffById(localStorage.getItem("staffId")).subscribe(res=>
        {
          this.data=res
          this.data=this.data.data
          this.initForm()
        })
        this.staffService.avatar.subscribe(res=>{
          this.data.avatar=res
        })
    }
    
  }
  initForm() {


    if(localStorage.getItem("isLoginStaff")=="true")
    {
      this.formGroup = new FormGroup({
        id: new FormControl(localStorage.getItem("staffId"), [Validators.required]),
        fullname: new FormControl(this.data?.fullname, [Validators.required]),
        gender: new FormControl(this.data?.gender, [Validators.required]),
        phonenumber: new FormControl(this.data?.phonenumber, [Validators.required])
      });
    }
    else
    {
      this.formGroup = new FormGroup({
        id: new FormControl(localStorage.getItem("adminId"), [Validators.required]),
        fullname: new FormControl(this.data?.fullname, [Validators.required]),
        gender: new FormControl(this.data?.gender, [Validators.required]),
        phonenumber: new FormControl(this.data?.phonenumber, [Validators.required])
      });
    }
    
 





  }
  editadmin() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thay đổi?',
      text: "Thông tin này sẽ bị thay đổi , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Chỉnh sửa!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmit = true
        this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)
        if (this.formGroup.valid && this.phonenumberValidate) {
          this.adminService.editadmin(this.formGroup.value).subscribe(res => {
            Swal.fire(
              'Đã chỉnh sửa!',
              'Thông tin được chỉnh sửa',
              'success'
            )
            this.getData()
          })
        }


      }
    })


  }
  inputPhoneChange()
  {
    
    this.phonenumberValidate = this.validateService.validatePhoneNumber(this.formGroup.controls['phonenumber'].value)

  }
  changeAvatar() {
    if(localStorage.getItem("isLoginStaff")=="true")
    {
      // var data={
      // id:localStorage.getItem("staffId"),
      // avatar: this.data.avatar
      // }
    }
   
    const dialogRef = this.dialog.open(ChangeAvatarComponent, {
      width: "600px",
      data: this.data
    })
    dialogRef.afterClosed().subscribe(res => {
      this.getData()
    })
  }

}
