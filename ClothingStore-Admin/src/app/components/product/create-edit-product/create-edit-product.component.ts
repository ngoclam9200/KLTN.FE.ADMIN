import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-edit-product',
  templateUrl: './create-edit-product.component.html',
  styleUrls: ['./create-edit-product.component.css']
})
export class CreateEditProductComponent implements OnInit {
  formGroup: FormGroup;
  selectedFile: File;
  imagePreview: any
  isChooseImage: boolean = true
  errorRes: any;
  isSubmit: boolean = false
  dataResponse: any;
  allCategory: any;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.isChooseImage = false
    if (this.imagePreview != null) {
      this.formGroup.controls['image'].setValue(this.imagePreview)

    }
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private dialog: MatDialog, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.initForm()
    this.getAllCategory()
    if(this.data.isEdit) 
    
    {
      this.imagePreview= this.formGroup.controls['image'].value
      this.isChooseImage=false
    }
  }
  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(res => {
      this.dataResponse = res
      this.allCategory = this.dataResponse.data

    })
  }
  initForm() {
    if (!this.data.isEdit) {
      this.formGroup = new FormGroup({
        categoryId: new FormControl(null, [Validators.required]),
        name: new FormControl(null, [Validators.required]),
        image: new FormControl(null, [Validators.required]),
        price: new FormControl(null, [Validators.required]),
        originalprice: new FormControl(null, [Validators.required]),
        count: new FormControl(null, [Validators.required]),
        discount: new FormControl(null, [Validators.required]),
        description: new FormControl(null, [Validators.required]),

      });
    }
    else {
      this.formGroup = new FormGroup({
        id: new FormControl(this.data.data.id, [Validators.required]),
        categoryId: new FormControl(this.data.data.categoryId, [Validators.required]),
        name: new FormControl(this.data.data.name, [Validators.required]),
        image: new FormControl(this.data.data.image, [Validators.required]),
        price: new FormControl(this.data.data.price, [Validators.required]),
        discount: new FormControl(this.data.data.discount, [Validators.required]),
        description: new FormControl(this.data.data.description, [Validators.required]),

      });
    }

  }
  createProduct() {
    if (this.imagePreview != null) {
      this.formGroup.controls['image'].setValue(this.imagePreview)

    }
    this.isSubmit = true
 
    if (this.formGroup.valid) {
      this.productService.createProduct(this.formGroup.value).subscribe(res => {
        Swal.fire(
          'Đã thêm!',
          'Thêm   sản phẩm  thành công',
          'success'
        )
        this.dialog.closeAll()


      }, err => {
        Swal.fire(
          'Đã có lỗi xảy ra!',
          'Thêm   sản phẩm  thất bại',
          'error'
        )
        //  this.errorRes = err
        //  this.errorRes = this.errorRes.error.message

        //  if (this.errorRes == "Tên loại sản phẩm đã tồn tại") this.nameExist = false
      })
    }

  }
  editProduct() {
    if (this.imagePreview != null) {
      this.formGroup.controls['image'].setValue(this.imagePreview)

    }

    this.productService.editProduct(this.formGroup.value).subscribe(res => {
      Swal.fire(
        'Đã chỉnh sửa!',
        'Chỉnh sửa  sản phẩm  thành công',
        'success'
      )
      this.dialog.closeAll()


    }, err => {
      Swal.fire(
        'Đã có lỗi xảy ra!',
        'Thêm   sản phẩm  thất bại',
        'error'
      )
    })
  }

}
