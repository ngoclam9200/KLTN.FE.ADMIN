import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-category',
  templateUrl: './create-edit-category.component.html',
  styleUrls: ['./create-edit-category.component.css']
})
export class CreateEditCategoryComponent implements OnInit {
  formGroup: FormGroup;
  selectedFile: File;
  imagePreview: any
  isChooseImage: boolean = true
  errorRes: any;
  nameExist: boolean = true;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.isChooseImage = false
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.initForm()
    if(this.data.isEdit)   
    {
      this.isChooseImage=false

    this.imagePreview=this.data.data.image
    
    }  
 
    

  }
  inputChange()
  {
    
      if(this.formGroup.controls['description'].value?.toString().length==1)
      {
        this.formGroup.get('description').setValue(this.formGroup.controls['description'].value?.charAt(0).toUpperCase() + this.formGroup.controls['description'].value?.slice(1))
        console.log(1);
        
      }
 
  }
  initForm() {
    if (!this.data.isEdit) {
      this.formGroup = new FormGroup({

        name: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),

      });
    }
    else {
      this.formGroup = new FormGroup({
        id: new FormControl(this.data.data.id, [Validators.required]),
        name: new FormControl(this.data.data.name, [Validators.required]),
        image: new FormControl(this.data.data.image , [Validators.required]),
        description: new FormControl(this.data.data.description, [Validators.required]),
        
      });
    }

  }
  createCategory() {
    if (this.imagePreview != null) {
      this.formGroup.controls['image'].setValue(this.imagePreview)

    }

    this.categoryService.createCategory(this.formGroup.value).subscribe(res => {
      Swal.fire(
        'Đã thêm!',
        'Thêm loại sản phẩm  thành công',
        'success'
      )
      this.dialog.closeAll()


    }, err => {
      this.errorRes = err
      this.errorRes = this.errorRes.error.message

      if (this.errorRes == "Tên loại sản phẩm đã tồn tại") this.nameExist = false
    })
  }
  editCategory() {
    if (this.imagePreview != null) {
      this.formGroup.controls['image'].setValue(this.imagePreview)

    }

    this.categoryService.editCategory(this.formGroup.value).subscribe(res => {
      Swal.fire(
        'Đã chỉnh sửa!',
        'Chỉnh sửa loại sản phẩm  thành công',
        'success'
      )
      this.dialog.closeAll()


    }, err => {
      this.errorRes = err
      this.errorRes = this.errorRes.error.message

      if (this.errorRes == "Tên loại sản phẩm đã tồn tại") this.nameExist = false
    })
  }

}
