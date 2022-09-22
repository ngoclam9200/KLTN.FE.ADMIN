import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RoleService } from 'src/app/services/role.service';
import { SignInService } from 'src/app/services/sign-in.service';
import Swal from 'sweetalert2';
import { CreateEditRoleComponent } from './create-edit-role/create-edit-role.component';
//  import { EditCustomerComponent } from './edit-customer/edit-customer.component';
// import { ShowCustomerComponent } from './show-customer/show-customer.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  rows: any = [];
  displayedColumns: string[] = ['name', 'dateCreated', 'chinhsua', 'xoa'];
  dataSource: any;
  allRoles: any
  dataResponse: any
  search: any = ""
  notfound:any=false
  constructor(private signInSerVice: SignInService, private dialog: MatDialog, private roleService: RoleService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {

    this.getAllRole()
  

  }
  getAllRole() {
    this.roleService.getAllRole().subscribe(res => {
      this.dataResponse = res
      console.log(res)
      this.allRoles = this.dataResponse.data
      this.dataSource = new MatTableDataSource(this.allRoles);
      this.dataSource.paginator = this.paginator;
    })
  }




  openEditRole(role: any) {
    const dialogRef = this.dialog.open(CreateEditRoleComponent, {
      width: '700px',
      data: {
        textBtn: "Chỉnh sửa",
        title: "Chỉnh sửa vai trò",
        data: role,
        isEdit: true
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllRole()

    });
  }
  openCreateRole() {
    const dialogRef = this.dialog.open(CreateEditRoleComponent, {
      width: '700px',
      data: {
        textBtn: "Thêm",
        title: "Thêm vai trò",
        isEdit: false
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getAllRole()

    });
  }
  
  searchRole()
  {
    if(this.search!="")
    {
      this.roleService.searchRole(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data==null) this.notfound=true
        else
        {
          this.allRoles = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allRoles);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllRole()
      this.notfound=false
    }
  }
  onChangeTextSearchEvent()
  {
    if(this.search!="")
    {
      this.roleService.searchRole(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data!=null) 
        {
         
          this.allRoles = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allRoles);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllRole()
      this.notfound=false
    }
  }
   
  


  openAlertDeleteRole(id: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Vai trò sẽ bị xóa , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa vai trò!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.roleService.deleteRole(id).subscribe(res => {
          Swal.fire(
            'Đã xóa!',
            'Vai trò này đã được xóa.',
            'success'
          )
          this.getAllRole()
        })

      }
    })
  }

}
