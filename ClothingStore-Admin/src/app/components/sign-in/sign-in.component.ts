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
  labelPosition:any= 'admin' 
  constructor(private router: Router, private signInService: SignInService) { }
  formGroup: FormGroup;
  ngOnInit(): void {
    if (localStorage.getItem("isLoginAdmin") == "true" || localStorage.getItem("isLoginStaff") == "true" ) {
     
    this.router.navigate(['/customer'])


   }
   this.initForm()
  }
  initForm() {
    
    if(localStorage.getItem("isRememberAdmin")=="true" &&  this.labelPosition=="admin")
    {
     
      this.formGroup = new FormGroup({
        username: new FormControl(localStorage.getItem("usernameAdmin"), [Validators.required]),
        password: new FormControl(localStorage.getItem("passwordAdmin"), [Validators.required]),
        isRemember: new FormControl(true, [Validators.required])
      });
    }
    else if(localStorage.getItem("isRememberStaff")=="true" &&  this.labelPosition=="staff")
    {
      this.formGroup = new FormGroup({
        username: new FormControl(localStorage.getItem("usernameStaff"), [Validators.required]),
        password: new FormControl(localStorage.getItem("passwordStaff"), [Validators.required]),
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
  changeRadioBtn()
  {
     if(this.labelPosition=="admin") this.labelPosition="staff"
     else  this.labelPosition="admin"
    
    this.initForm()
    
  }
  signIn() {
    
    if(this.labelPosition=="admin")
    {
       this.signInService.loginAdmin(this.formGroup.value)
    this.signInService.isLoginFailed.subscribe(res=>
      {
        this.isLoginFailed=res
      })
    }
    else {
       this.signInService.loginStaff(this.formGroup.value)
    this.signInService.isLoginFailed.subscribe(res=>
      {
        this.isLoginFailed=res
      })
    }
   
    
    

  }

}
