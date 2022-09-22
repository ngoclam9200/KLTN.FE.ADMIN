import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-role',
  templateUrl: './create-edit-role.component.html',
  styleUrls: ['./create-edit-role.component.css']
})
export class CreateEditRoleComponent implements OnInit {
  formGroup: FormGroup;
  roleRes: any;
  message: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private roleService: RoleService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.initForm()
  }
  initForm() {
    if (this.data.isEdit == true)
      this.formGroup = new FormGroup({
        id: new FormControl(this.data.data.id, [Validators.required]),
        name: new FormControl(this.data.data.name, [Validators.required]),

      });
    else {
      this.formGroup = new FormGroup({
        name: new FormControl("", [Validators.required]),

      });
    }


  }
  editRole() {
    this.roleService.editRole(this.formGroup.value).subscribe(res => {
      this.roleRes = res

      this.message = this.roleRes.message
      Swal.fire(
        'Đã chỉnh sửa!',
        this.message,
        'success'
      )
      this.dialog.closeAll()
    },
      err => {
        this.roleRes = err
        this.message = this.roleRes.error.message
        Swal.fire(
          'Đã có lỗi xảy ra!',
          this.message,
          'error'
        )
      })
  }
  createRole() {
    this.roleService.createRole(this.formGroup.value).subscribe(res => {
      this.roleRes = res

      this.message = this.roleRes.message
      Swal.fire(
        'Đã thêm!',
        this.message,
        'success'
      )
      this.dialog.closeAll()

    },
      err => {


        this.roleRes = err

        this.message = this.roleRes.error.message


        Swal.fire(
          'Đã có lỗi xảy ra!',
          this.message,
          'error'
        )
      })
  }

}
