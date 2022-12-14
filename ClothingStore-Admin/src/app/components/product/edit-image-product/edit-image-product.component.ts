import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-image-product',
  templateUrl: './edit-image-product.component.html',
  styleUrls: ['./edit-image-product.component.css']
})
export class EditImageProductComponent implements OnInit {
  selectedFile: File;
  imagePreview: any
  isChooseImage: boolean = true
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private productService: ProductService, private dialog: MatDialog ) { }
 dataRes:any
 listImage:any
 currentImage:any
 currentImageNumber: number=0
 listImageBorder:any=[]
 currentImageId:any
 isChangeImage:boolean=false
 isAddImage:boolean=false
 defauImageId:any
  ngOnInit(): void {
    this.getData()

  }
  getData()
  { 
    this.productService.getAllImageProductById(this.data.data.id).subscribe(res=>
      {
        
        this.dataRes=res
        this.listImage=this.dataRes.data
        this.currentImage=this.listImage[0].url
        this.currentImageId=this.listImage[0].id
        this.listImageBorder=[]
       for(let i=0; i<this.listImage.length;i++)
       {
        if(this.listImage[i].isDefaut) this.defauImageId= this.listImage[i].id
        if(i==0)
        {
          this.listImageBorder[i]=({
            url: this.listImage[i].url,
            class : "border-image",
          })
        }
        else
        {
          this.listImageBorder[i]=({
            url: this.listImage[i].url,
            class : "",
          })
        }
       
       }
      }
    
      )
      
  }
   onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.isChooseImage = false
   
  }
  addImageProduct()
  { 
    var data={
      productId: this.listImage[0].productId,
      url:this.imagePreview
    }
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n th??m?',
      text: "???nh s??? ???????c th??m , b???n kh??ng th??? ho??n t??c!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Th??m'
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.productService.addImageProduct(data).subscribe(res=>
          {
            Swal.fire(
              '???? th??m!',
              '???nh ???? ???????c th??m.',
              'success'
            )
            this.getData()
            this.isChooseImage=true
          })
         
      }
      
    })
   
  }
  nextImage()
  {
   
   
    if(this.currentImageNumber==this.listImage.length-1)
    {
      this.listImageBorder[this.currentImageNumber].class=""
      this.currentImage=this.listImage[0]?.url
      this.currentImageNumber =0
      this.currentImageId=this.listImage[0].idthis.listImageBorder[this.currentImageNumber].class="border-image"
      
    }
    else
    {
      this.listImageBorder[this.currentImageNumber].class=""
      this.currentImageNumber +=1
       
      this.currentImage=this.listImage[this.currentImageNumber]?.url
      this.listImageBorder[this.currentImageNumber].class="border-image"
      this.currentImageId=this.listImage[this.currentImageNumber].id
    }
  }
  prevImage()
  {
   
   
    if(this.currentImageNumber==0)
    { this.listImageBorder[this.currentImageNumber].class=""
      this.currentImage=this.listImage[this.listImage.length-1]?.url
      this.currentImageNumber =this.listImage.length-1
      this.listImageBorder[this.currentImageNumber].class="border-image"
      this.currentImageId=this.listImage[this.currentImageNumber].id
    }
    else
    {
      this.listImageBorder[this.currentImageNumber].class=""
      this.currentImageNumber -=1

      this.currentImage=this.listImage[this.currentImageNumber]?.url
      this.listImageBorder[this.currentImageNumber].class="border-image"
      this.currentImageId=this.listImage[this.currentImageNumber].id
    }
  }
  changeCurrentImage(index:any)
  {
    this.listImageBorder[this.currentImageNumber].class=""
    this.currentImage=this.listImage[index].url
    this.currentImageNumber=index
    this.listImageBorder[this.currentImageNumber].class="border-image"
    this.currentImageId=this.listImage[this.currentImageNumber].id

  }
  changeImageProduct()
  {
    var data={
      id:this.currentImageId,
      productId: this.listImage[0].productId,
      url:this.imagePreview
    }
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n thay ?????i?',
      text: "???nh s??? b??? thay ?????i , b???n kh??ng th??? ho??n t??c!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Thay ?????i'
    }).then((result) => {
      if (result.isConfirmed) {
       
        this.productService.changeImageProduct(data).subscribe(res=>
          { 
            Swal.fire(
              '???? thay ?????i!',
              '???nh ???? ???????c thay ?????i.',
              'success'
            )
          this.getData()
          this.isChooseImage=true
        })
         
      }
      
    })
    
  }
  buttonChangeClick()
  {
    this.isChangeImage=true
    this.isAddImage=false
    this.isChooseImage=true
  }
  buttonAddClick()
  {
    this.isChangeImage=false
    this.isAddImage=true
    this.isChooseImage=true
  }
  deleteImage()
  {
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n x??a?',
      text: "???nh s??? b??? x??a , b???n kh??ng th??? ho??n t??c!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??a'
    }).then((result) => {
      if (result.isConfirmed) {
       

        this.productService.deleteImage(this.currentImageId).subscribe(res=>{
      
          this.getData()
          Swal.fire(
            '???? x??a!',
            '???nh ???? ???????c x??a.',
            'success'
          )
          
        })
      }
      
    })
  
  }
  

}
