// ======================================



// 

// ======================================

import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Observable, Subject, forkJoin} from 'rxjs';


 



@Injectable({providedIn:'root'})
export class SignInService {

     

    @Output()
    isLogin = new EventEmitter();
    username = new EventEmitter();
    constructor(private router: Router, private http: HttpClient) {

    }


   login(username: any)
   {
    this.isLogin.emit(true)
    this.username.emit(username)


   }
}