import { Component, OnInit, ViewChild } from '@angular/core';
 import { MatTableDataSource } from '@angular/material/table';
 
 import { MatPaginator } from '@angular/material/paginator';
import { SignInService } from 'src/app/services/sign-in.service';
import {MatDialog} from '@angular/material/dialog';
import { CreateEditStaffComponent } from './create-edit-staff/create-edit-staff.component';
 import { ShowStaffComponent } from './show-staff/show-staff.component';
import Swal from 'sweetalert2';
import { StaffService } from 'src/app/services/staff.service';
import { Router } from '@angular/router';
import { SalaryStaffService } from 'src/app/services/salary-staff.service';
import * as moment from 'moment';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  rows:any = [];
  displayedColumns: string[] = ['avatar','ten', 'email', 'luong','salary-staff-today','salary-staff','chinhsua', 'xoa'];
  dataSource:any;
  dataResponse: any;
  allStaff: any;
  search: string="";
  notfound:any=false
  isLoading=true
  dataRes:any
  listDayWorking:any
  currentDay = moment().format('DD/MM/YYYY')
  constructor(private signInSerVice:SignInService,private salaryStaffService: SalaryStaffService,
     private dialog : MatDialog, private staffService: StaffService , private router :Router ) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  ngOnInit(): void {
    
   
   this.getAllStaff()
  }


  getAllStaff() {
    this.staffService.getAllStaff().subscribe(res => {
      this.dataResponse = res
       this.allStaff= this.dataResponse.data
       for (let i=0 ; i<this.allStaff.length; i++)
       {
        this.salaryStaffService.getSalaryByStaffId(this.allStaff[i].id).subscribe(res=>
          { 
            this.dataRes = res
            this.dataRes = this.dataRes.data[0]
             this.listDayWorking = this.dataRes.listDayWorking.split(',')
             this.allStaff[i].isPayToDay=false
             this.allStaff[i].salaryId=this.dataRes.id
            for (let j = 0; j < this.listDayWorking.length; j++) {
              if(this.listDayWorking[j]==new Date().getDate().toString()) 
              {
                this.allStaff[i].isPayToDay=true
                break;
              }
            }
          })
       }
      this.dataSource = new MatTableDataSource(this.allStaff);
      this.dataSource.paginator = this.paginator;
      this.isLoading=false
      
      
    })
  }
  PayToday(id)
  {
    const data={
      id: this.allStaff[id].salaryId,
      listDayWorking: new Date().getDate().toString()
    }
    Swal.fire({
      title: 'Bạn có chắc chắn muốn tính?',
      text: "Lương ngày hôm nay sẽ được tính , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Tính lương!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.salaryStaffService.PayForToday(data).subscribe(res => {
          Swal.fire(
            'Đã tính!',
            'Lương ngày'+ this.currentDay + ' này đã được tính.',
            'success'
          )
          this.getAllStaff()
        })

      }
      else
      {
        this.getAllStaff()
        
      }
    })
  
     
  }
  openCreateStaff()
  {
    const dialogREf=this.dialog.open(CreateEditStaffComponent, {
      width: '700px',
      data:{
        textBtn:"Thêm",
        title: "Thêm nhân viên",
        isEdit:false,
        
      }
    })
    dialogREf.afterClosed().subscribe(res=>
      {
        this.getAllStaff()
      })
  }
  openEditStaff(data:any)
  {
    const dialogRef=this.dialog.open(CreateEditStaffComponent, {
      width: '700px',
      data:{
        textBtn:"Chỉnh sửa",
        title: "Chỉnh sửa thông tin nhân viên",
        isEdit: true,
        data:data
      }
    })
    dialogRef.afterClosed().subscribe(res=>
      {
        this.getAllStaff()
      })
  }
  openShowStaff()
  {
    this.dialog.open(ShowStaffComponent, {
      width: '700px',
       
    })
  }
  openAlertDeleteStaff(id: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: "Nhân viên này sẽ bị xóa , bạn không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa nhân viên!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.staffService.deleteStaff(id).subscribe(res => {
          Swal.fire(
            'Đã xóa!',
            'Nhân viên này đã được xóa.',
            'success'
          )
          this.getAllStaff()
        })

      }
    })
  }

  salaryStaff(id:any)
  {
    this.router.navigate(['/salary-staff/'+id])
  }
  searchStaff()
  {
    if(this.search!="")
    {
      this.staffService.searchStaff(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data==null) this.notfound=true
        else
        {
          this.allStaff = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allStaff);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllStaff()
      this.notfound=false
    }
  }
  onChangeTextSearchEvent()
  {
    if(this.search!="")
    {
      this.staffService.searchStaff(this.search).subscribe(res=>{
      
        this.dataResponse = res
        if(this.dataResponse.data!=null) 
        {
         
          this.allStaff = this.dataResponse.data
          this.dataSource = new MatTableDataSource(this.allStaff);
          this.dataSource.paginator = this.paginator;
          this.notfound=false
        }
      
      })
    }
    else
    {
      this.getAllStaff()
      this.notfound=false
    }
  }
   
  
}
