import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
import { CreateEditCategoryComponent } from './create-edit-category/create-edit-category.component';
import { ShowCategoryComponent } from './show-category/show-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  rows:any = [];
  displayedColumns: string[] = ['image', 'name',"show",'chinhsua', 'xoa'];
  dataSource:any;
  dataResponse: any;
  allCategory:any
  search: string="";
  notfound: boolean=false;
  isLoading=true
  constructor(private signInSerVice:SignInService, private dialog : MatDialog, private categoryService: CategoryService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.getAllCategory()
    
  }
  
  searchCategory()
  {
    if(this.search!="")
    {
      this.categoryService.searchCategory(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data==null) this.notfound=true
        else
        {
          this.allCategory = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allCategory);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllCategory()
      this.notfound=false
    }
  }
  onChangeTextSearchEvent()
  {
    if(this.search!="")
    {
      this.categoryService.searchCategory(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data!=null) 
        {
         
          this.allCategory = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allCategory);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllCategory()
      this.notfound=false
    }
  }
  
  openAlertDeleteCategory(id: any) {
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n x??a?',
      text: "Lo???i s???n ph???m s??? b??? x??a , b???n kh??ng th??? ho??n t??c!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??a lo???i s???n ph???m!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(res => {
          Swal.fire(
            '???? x??a!',
            'Lo???i s???n ph???m  n??y ???? ???????c x??a.',
            'success'
          )
          this.getAllCategory()
        })

      }
    })
  }
  getAllCategory()
  {
    this.categoryService.getAllCategory().subscribe(res => {
      this.dataResponse = res
      this.allCategory = this.dataResponse.data
      this.dataSource = new MatTableDataSource(this.allCategory);
      this.dataSource.paginator = this.paginator;
      this.isLoading=false
    })
  }
  openCreateCategory()
  {
   const dialogRef= this.dialog.open(CreateEditCategoryComponent, {
      width: '700px',
      data:{
        textBtn:"Th??m",
        title: "Th??m lo???i s???n ph???m",
        isEdit: false
      }
    })
    dialogRef.afterClosed().subscribe(res=>
      {
        this.getAllCategory()
      })
  }
  openEditCategory(data:any)
  {
    const dialogRef=this.dialog.open(CreateEditCategoryComponent, {
      width: '700px',
      data:{
        textBtn:"Ch???nh s???a",
        title: "Ch???nh s???a th??ng tin lo???i s???n ph???m",
        data:data,
        isEdit :true
      }
    })
    dialogRef.afterClosed().subscribe(res=>
      {
        this.getAllCategory()
      })
  }
  openShowCategory(data:any)
  {
    this.dialog.open(ShowCategoryComponent,{
      width: '700px',
      data:data
    })
  }


}
