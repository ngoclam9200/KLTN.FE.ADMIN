import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(private router:Router, private signInService :SignInService) { }

  ngOnInit(): void {
  }
  signIn()
  {
    localStorage.setItem("isLogin", "true")
    this.signInService.login()
    this.router.navigate(['staff'])

    
  }

}
