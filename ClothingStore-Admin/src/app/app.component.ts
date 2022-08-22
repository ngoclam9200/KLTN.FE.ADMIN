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
  isLogin=false;
  icon:any="expand_more"
  constructor(private router:Router, private signInService:SignInService) { }
  ngOnInit(): void {
    if(localStorage.getItem("isLogin")=="true")
    
    {
      this.isLogin=true
    }
    else 
    {
      this.isLogin=false
      this.router.navigate(['sign-in'])
    }
    this.signInService.isLogin.subscribe(res=>{
      this.isLogin=true
    })
    

  }
  logOut()
  {
    localStorage.clear();
    this.isLogin=false
    this.router.navigate(['sign-in'])
  }
   

}
