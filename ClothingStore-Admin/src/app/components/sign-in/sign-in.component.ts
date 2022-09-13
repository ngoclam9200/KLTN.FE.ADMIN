import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  username: any;
  password: any;
  constructor(private router:Router, private signInService :SignInService) { }

  ngOnInit(): void {
  }
  signIn()
  { 
 
    if(this.username=="admin" && this.password=="1")
    {
      sessionStorage.setItem("isLogin", "true")
      sessionStorage.setItem("role", "admin")
      sessionStorage.setItem("username", this.username)
      this.signInService.login(this.username)
      this.router.navigate(['staff'])
    }
    if(this.username=="staff" && this.password=="2")
    {
      sessionStorage.setItem("isLogin", "true")
      sessionStorage.setItem("role", "staff")
      sessionStorage.setItem("username", this.username)
      this.signInService.login(this.username)
      this.router.navigate(['order'])
    }
    
  }

}
