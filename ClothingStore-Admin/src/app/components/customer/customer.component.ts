import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerService } from 'src/app/services/customer.service';
 import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
 import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ShowCustomerComponent } from './show-customer/show-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  rows:any = [];
  displayedColumns: string[] = ['fullname','email','phonenumber',  'show','chinhsua', 'xoa'];
  dataSource:any;
  dataResponse: any;
  allUser: any;
  search: any = ""
  notfound: boolean=false;
  isLoading=true
  constructor(private signInSerVice:SignInService, private dialog : MatDialog, private customerService: CustomerService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    this.getAllUser()
  }
  
  
  getAllUser()
  {
    this.customerService.getAllCustomer().subscribe(res => {
      this.dataResponse = res
      this.allUser = this.dataResponse.data
      this.dataSource = new MatTableDataSource(this.allUser);
      this.dataSource.paginator = this.paginator;
      this.isLoading=false
    })
  }
  onChangeTextSearchEvent() {
   
    this.searchCustomerOnChange()

  }
  
  searchCustomer()
  {
    if(this.search!="")
    {
      this.customerService.searchUser(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data==null) this.notfound=true
        else
        {
          this.allUser = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allUser);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllUser()
      this.notfound=false
    }
  }
  searchCustomerOnChange()
  {
    if(this.search!="")
    {
      this.customerService.searchUser(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data!=null) 
        {
         
          this.allUser = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allUser);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllUser()
      this.notfound=false
    }
  }
  openEditCustomer(data:any)
  {
    const dialogRef= this.dialog.open(EditCustomerComponent, {
      width: '700px',
      data:{
        textBtn:"Ch???nh s???a",
        title: "Ch???nh s???a th??ng tin kh??ch h??ng",
        data :data
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser()

    });
  }
  openShowCustomer(data:any)
  {
    this.dialog.open(ShowCustomerComponent, {
      width: '700px',
      data :data
       
    })
  }
  openAlertDeleteUser(id: any) {
    Swal.fire({
      title: 'B???n c?? ch???c ch???n mu???n x??a?',
      text: "Ng?????i d??ng s??? b??? x??a , b???n kh??ng th??? ho??n t??c!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'X??a ng?????i d??ng!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteUser(id).subscribe(res => {
          Swal.fire(
            '???? x??a!',
            'Ng?????i d??ng n??y ???? ???????c x??a.',
            'success'
          )
          this.getAllUser()
        })

      }
    })
  }


}
