import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl=environment.apiUrl+"/Admin"
  @Output() avatar = new EventEmitter();
  constructor( private http: HttpClient ,) { }
  getadminById(id:any)
  {
    return this.http.get(this.apiUrl+ "/get-admin-by-id/"+ id)
  }
  editadmin(data:any)
  {
    return this.http.put(this.apiUrl+ "/edit-admin", data)
  }
  editAvataradmin(data:any)
  {

    return this.http.put(this.apiUrl+ "/edit-avatar-admin", data).subscribe(res=>{
      this.avatar.emit(data.avatar)
    })
  }
  getAvatarAdminById(id:any)
  {
    return this.http.get(this.apiUrl+ "/get-admin-by-id/"+ id).subscribe(res=>{
      var data:any=res
      data=data.data
      this.avatar.emit(data.avatar)
    })
  }
}
