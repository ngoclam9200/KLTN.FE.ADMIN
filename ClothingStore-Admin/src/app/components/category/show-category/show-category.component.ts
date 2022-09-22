import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEditCategoryComponent } from '../create-edit-category/create-edit-category.component';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  constructor(private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) { }
   

  ngOnInit(): void {
    console.log(this.data)
  }
   
}
