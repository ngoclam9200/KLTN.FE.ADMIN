import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";

import { environment } from 'src/environments/environment';
import jwt_decode from "jwt-decode";
import { RoleService } from './role.service';
import { AdminService } from './admin.service';
import { StaffService } from './staff.service';
import { OrderService } from './order.service';
import { ChatService } from './chat.service';
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
    errorText = new EventEmitter();
    @Output() avatar = new EventEmitter();

    constructor(private router: Router, private http: HttpClient, private adminService: AdminService, private staffService: StaffService,
        private roleService: RoleService, private orderService:OrderService, private chatService:ChatService) {

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
            localStorage.setItem("adminId", this.decodedToken.id)
       

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
                localStorage.setItem("isRememberAdmin", data.isRemember)
                localStorage.setItem("usernameAdmin", data.username)
                localStorage.setItem("passwordAdmin", data.password)
                this.username.emit(data.username)
                this.isLogin.emit(true)
                this.adminService.getadminById(this.decodedToken.id).subscribe(res => {
                    var avatar: any = res
                    avatar = avatar.data
                    this.avatar.emit(avatar.avatar)
                    this.orderService.getCountOrderWaitConfirm()


                })
                this.chatService.getCountMessageUnread()


            })





        }, err => {
            var errtext = err.error.message
          
            
            this.errorText.emit(errtext)
            this.isLoginFailed.emit(true)
            
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
            localStorage.setItem("staffId", this.decodedToken.id)
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
                localStorage.setItem("isRememberStaff", data.isRemember)
                localStorage.setItem("usernameStaff", data.username)
                localStorage.setItem("passwordStaff", data.password)
                this.username.emit(data.username)
                this.isLogin.emit(true)
                this.staffService.getstaffById(this.decodedToken.id).subscribe(res => {
                    var avatar: any = res
                    avatar = avatar.data
                
                    this.avatar.emit(avatar.avatar)


                })

            })





        }, err => {
           
            var errtext = err.error.message
          
            
            this.errorText.emit(errtext)
            this.isLoginFailed.emit(true)

        })




    }
}