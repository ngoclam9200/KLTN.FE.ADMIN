import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryStaffService {

  apiUrl=environment.apiUrl+"/SalaryStaff/"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getSalaryByStaffId(staffid:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"get-salary-by-staffid?staffid="+staffid, {headers:headers})
  }
  PayForToday(data:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"pay-for-today",data, {headers:headers})
  }
  PayForMonth(data:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"pay-for-month",data, {headers:headers})
  }
}
