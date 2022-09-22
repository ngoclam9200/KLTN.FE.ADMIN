import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";

import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { RoleService } from './role.service';
@Injectable({ providedIn: 'root' })
export class SignInService {
    data: any
    decodedToken: any
    apiUrl = environment.apiUrl + "/Staff"
    roleRes: any
    roleName: any
 
    @Output()
    isLogin = new EventEmitter();
    isLoginFailed = new EventEmitter();
    username = new EventEmitter();
    constructor(private router: Router, private http: HttpClient, private roleService: RoleService) {

    }


    login(data: any) {

        // this.username.emit(data)
        let headers = new HttpHeaders();
        return this.http.post(this.apiUrl + "/login-staff", data, { headers: headers }).subscribe(res => {
            this.data = res
            let token = this.data.data
            sessionStorage.setItem("token", token)
            this.decodedToken = jwt_decode(token);
            sessionStorage.setItem("isLogin", "true")
            sessionStorage.setItem("username", this.decodedToken.username)
            this.roleService.getRoleById().subscribe(res => {
                this.isLoginFailed.emit(false)
                this.roleRes = res
                this.roleName = this.roleRes.data.name
                if (this.roleName == "admin") {
                    sessionStorage.setItem("role", "admin")
                    this.router.navigate(['role'])
                }
                if (this.roleName == "staff") {

                    sessionStorage.setItem("role", "staff")
                    this.router.navigate(['order'])
                }
                console.log(data.password)
                sessionStorage.setItem("isRemember",data.isRemember)
                sessionStorage.setItem("username", data.username)
                sessionStorage.setItem("password", data.password)
            //    console.log( this.isLoginFailed, "v");
               this.username.emit(data.username)
                this.isLogin.emit(true)
                
            })



            // this.signInService.login(this.formGroup.value)


            console.log(this.decodedToken);
        },err=>{
          
            this.isLoginFailed.emit(true)
            // console.log( this.isLoginFailed, "sdsad")
            
        })




    }
}