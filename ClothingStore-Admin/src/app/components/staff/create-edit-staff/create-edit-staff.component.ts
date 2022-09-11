import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-edit-staff',
  templateUrl: './create-edit-staff.component.html',
  styleUrls: ['./create-edit-staff.component.css']
})
export class CreateEditStaffComponent implements OnInit {
 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
  }

}
