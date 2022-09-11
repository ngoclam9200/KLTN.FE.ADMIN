import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditStaffComponent } from '../create-edit-staff/create-edit-staff.component';

@Component({
  selector: 'app-show-staff',
  templateUrl: './show-staff.component.html',
  styleUrls: ['./show-staff.component.css']
})
export class ShowStaffComponent implements OnInit {

  constructor( private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openEditStaff()
  { this.dialog.closeAll()
    this.dialog.open(CreateEditStaffComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin nhân viên"
      }
    })
  }
}
