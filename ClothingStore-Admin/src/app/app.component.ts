import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from './services/chat.service';
import { SignInService } from './services/sign-in.service';
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
  constructor(private router: Router, private signInService: SignInService, private chatService: ChatService) { }
  ngOnInit(): void {
   
  
    if (localStorage.getItem("isLoginAdmin") == "true" || localStorage.getItem("isLoginStaff") == "true" ) {
       
      this.isLogin = true;

      if(localStorage.getItem("role")=="admin")
      this.username = localStorage.getItem("usernameAdmin")
      if(localStorage.getItem("role")=="staff")
      this.username = localStorage.getItem("usernameStaff")
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


  }
  logOut() {
   
    if(localStorage.getItem('isRememberAdmin')=="true")
    {
      localStorage.removeItem('isLoginAdmin')
      localStorage.removeItem('role')
      localStorage.removeItem('token')
    }
    else if(localStorage.getItem('isRememberStaff')=="true")
    {
      localStorage.removeItem('isLoginStaff')
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
