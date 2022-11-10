import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Pusher from 'pusher-js';
import { AdminService } from './services/admin.service';
import { ChatService } from './services/chat.service';
import { OrderService } from './services/order.service';
import { SignInService } from './services/sign-in.service';
import { StaffService } from './services/staff.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  isCollapsed = false;
  isLogin = false;
  isAdmin =true;
  username: any
 
  icon: any = "expand_more"
  countMessUnread:any
  countOrder:any
  data:any
  avatar:any
  constructor(private router: Router,private adminService:AdminService,private staffService: StaffService,
     private signInService: SignInService, private chatService: ChatService, private orderService: OrderService) { }
  ngOnInit(): void {
   
   this.signInService.avatar.subscribe(res=>
    {
       
      this.avatar=res
    })
 
    this.adminService.avatar.subscribe(res=>{
     
      this.avatar=res
    })
    this.staffService.avatar.subscribe(res=>{
    
      this.avatar=res
    })
    if (localStorage.getItem("isLoginAdmin") == "true" || localStorage.getItem("isLoginStaff") == "true" ) {
      if(localStorage.getItem("isLoginAdmin")=="true")
      {
        this.adminService.getAvatarAdminById(localStorage.getItem("adminId"))
   
          this.adminService.avatar.subscribe(res=>{
          
            this.avatar=res
          })
          this.orderService.getCountOrderWaitConfirm()

      }
      if(localStorage.getItem("isLoginStaff")=="true")
      {
        this.staffService.getAvatarStaffById(localStorage.getItem("staffId"))
        
          this.staffService.avatar.subscribe(res=>{
        
            this.avatar=res
          })
          this.orderService.getCountOrderWaitConfirm()
      }
    
      this.isLogin = true;

      if(localStorage.getItem("role")=="admin")
      this.username = localStorage.getItem("usernameAdmin")
      if(localStorage.getItem("role")=="staff")
      this.username = localStorage.getItem("usernameStaff")
      this.orderService.countOrderWaitConfirm.subscribe(res=>{
        this.countOrder=res
      })
     
     this.getlocalStorage()


    }
    // else {
    //   this.isLogin = false
    //   this.router.navigate(['sign-in'])
    // }
    this.signInService.isLogin.subscribe(res => {
     
      this.isLogin = true
      this.getlocalStorage()
      
    })
    this.signInService.username.subscribe(res => {
      this.username = res
    })
    this.chatService.getCountMessageUnread()
    this.chatService.countUnRead.subscribe(res=>{
      this.countMessUnread =res
      })
      Pusher.logToConsole = true;

      const pusher = new Pusher('05ba42f251be5a21e7fa', {
        cluster: 'ap1'
      });
  
      const channel = pusher.subscribe('my-channel');
      channel.bind('my-event', data => {
        this.chatService.getCountMessageUnread() 
           
           
       
        
      
     
    
      });


  }
  logOut() {
    localStorage.removeItem('staffId')
    localStorage.removeItem('adminId')
    localStorage.removeItem('isLoginAdmin')
    localStorage.removeItem('isLoginStaff')
    if(localStorage.getItem('isRememberAdmin')=="true")
    {
      
      localStorage.removeItem('role')
      localStorage.removeItem('token')
   
    }
    else if(localStorage.getItem('isRememberStaff')=="true")
    {
     
      localStorage.removeItem('role')
      localStorage.removeItem('token')
   
    }

    else
    {
      localStorage.clear();
    }
   
    this.isLogin = false
    this.router.navigate(['sign-in'])
  }
  goProfilePage() {
    this.router.navigate(['profile'])
  }
  getlocalStorage()
  {
    if (localStorage.getItem("role") == "staff") {
      this.isAdmin = false
    }
    if (localStorage.getItem("role") == "admin") {
      this.isAdmin = true
    }
  }


}
