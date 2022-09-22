import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl=environment.apiUrl+"/User"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = sessionStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllCustomer()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-user", {headers:headers})
  }
  
 
  deleteUser(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-user/"+id, {headers:headers})
  }
  editUser(user:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-user/",user, {headers:headers})
  }
  searchUser(data:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-customer-by-name/"+data, {headers:headers})
  }

}
