import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ValidateService } from 'src/app/services/validate.service';
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
  countValidate: boolean = true
  countSizeSValidate: boolean = true
  countSizeMValidate: boolean = true
  countSizeLValidate: boolean = true
  countSizeXLValidate: boolean = true
  countSizeXXLValidate: boolean = true
  priceValidate: boolean = true
  originalPriceValidate: boolean = true
  discountValidate: boolean = true
  isSize: any = false
  countProd: any = 0
  

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private currencyPipe:CurrencyPipe,
    private productService: ProductService, private dialog: MatDialog,
    private categoryService: CategoryService
    , private validateService: ValidateService) { }

  ngOnInit(): void {
    this.initForm()
    this.getAllCategory()
    if (this.data.isEdit) {
      this.imagePreview = this.formGroup.controls['image'].value
      this.isChooseImage = false
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
        isSize: new FormControl(false, [Validators.required]),
        S: new FormControl(null, [Validators.required]),
        M: new FormControl(null, [Validators.required]),
        L: new FormControl(null, [Validators.required]),
        XL: new FormControl(null, [Validators.required]),
        XXL: new FormControl(null, [Validators.required]),
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
      var a= this.currencyPipe.transform(this.formGroup.controls['price'].value.toString().replace(/\D/g,'').replace(/^0+/,''),'VND','symbol','1.0-0')
    
 
      this.formGroup.controls['price'].setValue(a)
    }

  }
  inputCountChange() {
    this.countValidate = this.validateService.validateCount(this.formGroup.controls['count'].value)


  }
  inputCountSizeSChange() {
    this.countSizeSValidate = this.validateService.validateSizeCount(this.formGroup.controls['S'].value)
  }
  inputCountSizeMChange() {
    this.countSizeMValidate = this.validateService.validateSizeCount(this.formGroup.controls['M'].value)
  }
  inputCountSizeLChange() {
    this.countSizeLValidate = this.validateService.validateSizeCount(this.formGroup.controls['L'].value)
  }
  inputCountSizeXLChange() {
    this.countSizeXLValidate = this.validateService.validateSizeCount(this.formGroup.controls['XL'].value)
  }
  inputCountSizeXXLChange() {
    this.countSizeXXLValidate = this.validateService.validateSizeCount(this.formGroup.controls['XXL'].value)
  }
  inputPriceChange() {
    // this.priceValidate = this.validateService.validateCount(this.formGroup.controls['price'].value)
    var a= this.currencyPipe.transform(this.formGroup.controls['price'].value.toString().replace(/\D/g,'').replace(/^0+/,''),'VND','symbol','1.0-0')
  
this.formGroup.controls['price'].setValue(a)

  }
  inputDescriptionChange() {

    if (this.formGroup.controls['description'].value?.toString().length == 1) {
      this.formGroup.get('description').setValue(this.formGroup.controls['description'].value?.charAt(0).toUpperCase() + this.formGroup.controls['description'].value?.slice(1))


    }


  }
  inputNameChange() {


    if (this.formGroup.controls['name'].value?.toString().length == 1) {
      this.formGroup.get('name').setValue(this.formGroup.controls['name'].value?.charAt(0).toUpperCase() + this.formGroup.controls['name'].value?.slice(1))


    }

  }
  inputOriginalPriceChange() {
   var a= this.currencyPipe.transform(this.formGroup.controls['originalprice'].value.toString().replace(/\D/g,'').replace(/^0+/,''),'VND','symbol','1.0-0')
    // this.originalPriceValidate = this.validateService.validateCount(this.formGroup.controls['originalprice'].value)
 
this.formGroup.controls['originalprice'].setValue(a)


  }
  inputDiscountChange() {
    this.discountValidate = this.validateService.validateCount(this.formGroup.controls['discount'].value)
    if (this.formGroup.controls['discount'].value > 100)
      this.discountValidate = false
     

  }
 
  createProduct() {
    if (this.imagePreview != null) {
      this.formGroup.controls['image'].setValue(this.imagePreview)

    }
    this.isSubmit = true
   
    if (this.formGroup.controls['isSize'].value) {
      this.countProd=this.formGroup.controls['S'].value + this.formGroup.controls['M'].value +this.formGroup.controls['L'].value +this.formGroup.controls['XL'].value+this.formGroup.controls['XXL'].value
      this.formGroup.controls['count'].setValue(this.countProd)

    }
    else
    {
      this.formGroup.controls['S'].setValue(0)
      this.formGroup.controls['M'].setValue(0)
      this.formGroup.controls['L'].setValue(0)
      this.formGroup.controls['XL'].setValue(0)
      this.formGroup.controls['XXL'].setValue(0)
    }
   

    if (this.formGroup.valid) {
      
      this.formGroup.controls['originalprice'].setValue( parseInt( this.formGroup.controls['originalprice'].value.replace(/\D/g,'').replace(/^0+/,'')))
      this.formGroup.controls['price'].setValue( parseInt( this.formGroup.controls['price'].value.replace(/\D/g,'').replace(/^0+/,'')))

       if((this.formGroup.controls['isSize'].value && this.countProd>0) || !this.formGroup.controls['isSize'].value ) 
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
    else
    {
      Swal.fire(
        'Đã có lỗi xảy ra!',
        'Thêm   sản phẩm  thất bại',
        'error'
      )
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
