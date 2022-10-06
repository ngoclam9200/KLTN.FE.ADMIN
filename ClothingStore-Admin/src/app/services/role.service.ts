import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
 apiUrl=environment.apiUrl+"/Role"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllRole()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-roles", {headers:headers})
  }
  getRoleById()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-role-by-id", {headers:headers})
  }
  createRole(role:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+"/create-role",role, {headers:headers})
  }
  deleteRole(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-role/"+id, {headers:headers})
  }
  editRole(role:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-role-name/",role, {headers:headers})
  }
  searchRole(roleName:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-role-by-name/"+roleName, {headers:headers})
  }

}
