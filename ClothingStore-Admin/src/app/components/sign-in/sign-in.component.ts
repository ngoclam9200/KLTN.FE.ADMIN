import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  data: any
  decodedToken:any
  isRemember:any=false
  isLoginFailed:any=false
  constructor(private router: Router, private signInService: SignInService) { }
  formGroup: FormGroup;
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    if(sessionStorage.getItem("isRemember")=="true")
    {
      this.formGroup = new FormGroup({
        username: new FormControl(sessionStorage.getItem("username"), [Validators.required]),
        password: new FormControl(sessionStorage.getItem("password"), [Validators.required]),
        isRemember: new FormControl(true, [Validators.required])
      });
    }
    else{
      this.formGroup = new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required]),
        isRemember: new FormControl(false, [Validators.required])
      });
    }
    

  }
  signIn() {
    console.log(this.formGroup.value)
    this.signInService.login(this.formGroup.value)
    this.signInService.isLoginFailed.subscribe(res=>
      {
        this.isLoginFailed=res
      })
    
    

  }

}
