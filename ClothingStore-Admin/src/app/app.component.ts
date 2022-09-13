import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router, private signInService: SignInService) { }
  ngOnInit(): void {
    
    if (sessionStorage.getItem("isLogin") == "true") {
      this.isLogin = true;
      this.username = sessionStorage.getItem("username")
     this.getsessionStorage()


    }
    else {
      this.isLogin = false
      this.router.navigate(['sign-in'])
    }
    this.signInService.isLogin.subscribe(res => {
     
      this.isLogin = true
      this.getsessionStorage()
      
    })
    this.signInService.username.subscribe(res => {
      this.username = res
    })


  }
  logOut() {
    sessionStorage.clear();
    this.isLogin = false
    this.router.navigate(['sign-in'])
  }
  goProfilePage() {
    this.router.navigate(['profile'])
  }
  getsessionStorage()
  {
    if (sessionStorage.getItem("role") == "staff") {
      this.isAdmin = false
    }
    if (sessionStorage.getItem("role") == "admin") {
      this.isAdmin = true
    }
  }


}
