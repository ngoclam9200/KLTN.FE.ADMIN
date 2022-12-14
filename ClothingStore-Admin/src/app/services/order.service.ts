import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  @Output()
  countOrderWaitConfirm = new EventEmitter();
  apiUrl=environment.apiUrl+"/Order"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
 
  getOrderWaitConfirm( )
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/admin-get-all-waitconfirm-order/", {headers:header})
  }
  getCountOrderWaitConfirm( )
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/admin-get-count-waitconfirm-order/", {headers:header}).subscribe(res=>
      {
   
        var count :any=res
        count=count.data
        this.countOrderWaitConfirm.emit(count)

      })
  }
  getOrderDelivering( )
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/admin-get-all-delivering-order/", {headers:header})
  }
  getOrderDelivered( )
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/admin-get-all-delivered-order/", {headers:header})
  }
  getOrderCancle()
  {
    let header=this.getHeader()
    return this.http.get(this.apiUrl+ "/admin-get-all-cancle-order/", {headers:header})
  }
  confirmOrder(id:any)
  {
    let header=this.getHeader()
    return this.http.put(this.apiUrl+ "/confirm-order/",id, {headers:header})
  }
  cancleOrder(id:any)
  {
    let header=this.getHeader()
    return this.http.put(this.apiUrl+ "/cancle-order/",id, {headers:header})
  }
  deliveredOrder(id:any)
  {
    let header=this.getHeader()
    return this.http.put(this.apiUrl+ "/delivered-order/",id, {headers:header})
  }
}
