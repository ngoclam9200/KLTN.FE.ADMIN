import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  apiUrl=environment.apiUrl+"/Voucher"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllVoucher()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-voucher", {headers:headers})
  }
  
  createVoucher(Voucher:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+"/create-voucher",Voucher, {headers:headers})
  }
  deleteVoucher(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-voucher/"+id, {headers:headers})
  }
  editVoucher(role:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-voucher/",role, {headers:headers})
  }
  searchVoucher(code:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-voucher-by-code/"+code, {headers:headers})
  }
}
