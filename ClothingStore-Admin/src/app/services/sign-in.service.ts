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
    apiUrlStaff = environment.apiUrl + "/Staff"
    apiUrlAdmin = environment.apiUrl + "/Admin"
    roleRes: any
    roleName: any
 
    @Output()
    isLogin = new EventEmitter();
    isLoginFailed = new EventEmitter();
    username = new EventEmitter();
    constructor(private router: Router, private http: HttpClient, private roleService: RoleService) {

    }


    loginAdmin(data: any) {

        // this.username.emit(data)
        let headers = new HttpHeaders();
        return this.http.post(this.apiUrlAdmin + "/login-admin", data, { headers: headers }).subscribe(res => {
            this.data = res
            let token = this.data.data
            localStorage.setItem("token", token)
            this.decodedToken = jwt_decode(token);
            localStorage.setItem("isLoginAdmin", "true")
            localStorage.setItem("usernameAdmin", this.decodedToken.username)
            this.roleService.getRoleById().subscribe(res => {
                this.isLoginFailed.emit(false)
                this.roleRes = res
                this.roleName = this.roleRes.data.name
                if (this.roleName == "admin") {
                    localStorage.setItem("role", "admin")
                    this.router.navigate(['role'])
                }
                if (this.roleName == "staff") {

                    localStorage.setItem("role", "staff")
                    this.router.navigate(['order'])
                }
                console.log(data.password)
                localStorage.setItem("isRememberAdmin",data.isRemember)
                localStorage.setItem("usernameAdmin", data.username)
                localStorage.setItem("passwordAdmin", data.password)
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
    loginStaff(data: any) {

        // this.username.emit(data)
        let headers = new HttpHeaders();
        return this.http.post(this.apiUrlStaff + "/login-staff", data, { headers: headers }).subscribe(res => {
            this.data = res
            let token = this.data.data
            localStorage.setItem("token", token)
            this.decodedToken = jwt_decode(token);
            localStorage.setItem("isLoginStaff", "true")
            localStorage.setItem("usernameStaff", this.decodedToken.username)
            this.roleService.getRoleById().subscribe(res => {
                this.isLoginFailed.emit(false)
                this.roleRes = res
                this.roleName = this.roleRes.data.name
                if (this.roleName == "admin") {
                    localStorage.setItem("role", "admin")
                    this.router.navigate(['role'])
                }
                if (this.roleName == "staff") {

                    localStorage.setItem("role", "staff")
                    this.router.navigate(['order'])
                }
                console.log(data.password)
                localStorage.setItem("isRememberStaff",data.isRemember)
                localStorage.setItem("usernameStaff", data.username)
                localStorage.setItem("passwordStaff", data.password)
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