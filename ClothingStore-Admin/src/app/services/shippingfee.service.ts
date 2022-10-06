import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShippingfeeService {

  apiUrl=environment.apiUrl+"/ShippingFee"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = localStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllShippingFee()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-shippingfee", {headers:headers})
  }
  
  createShippingFee(ShippingFee:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+"/create-shippingfee",ShippingFee, {headers:headers})
  }
  deleteShippingFee(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-shippingfee/"+id, {headers:headers})
  }
  editShippingFee(shippingfee:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-shippingfee/",shippingfee, {headers:headers})
  }
  searchShippingFee(name:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-shippingfee-by-name/"+name, {headers:headers})
  }
}
