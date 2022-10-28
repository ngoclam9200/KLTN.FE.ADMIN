import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  apiUrl=environment.apiUrl+"/Staff"
  @Output() avatar = new EventEmitter();
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllStaff()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-staff", {headers:headers})
  }
 
  createStaff(staff:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+"/register-staff",staff, {headers:headers})
  }
  deleteStaff(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-staff/"+id, {headers:headers})
  }
  editStaff(staff:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-staff/",staff, {headers:headers})
  }
  searchStaff(staffName:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-staff-by-nameoremail/"+staffName, {headers:headers})
  }
  getstaffById(id:any)
  {
    return this.http.get(this.apiUrl+ "/get-staff-by-id/"+ id)
  }
  editstaff(data:any)
  {
    return this.http.put(this.apiUrl+ "/edit-staff-profile", data)
  }
  editAvatarstaff(data:any)
  {

    return this.http.put(this.apiUrl+ "/edit-avatar-staff", data).subscribe(res=>{
      this.avatar.emit(data.avatar)
    })
  }
}
