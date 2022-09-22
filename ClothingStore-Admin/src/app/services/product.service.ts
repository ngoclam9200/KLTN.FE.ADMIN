import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl=environment.apiUrl+"/Product"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = sessionStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllProduct()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-product", {headers:headers})
  }
  
  createProduct(prod:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+"/create-product",prod, {headers:headers})
  }
  deleteProduct(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-product/"+id, {headers:headers})
  }
  editProduct(prod:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-product/",prod, {headers:headers})
  }
  searchProduct(prod:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-product-by-name/"+prod, {headers:headers})
  }
}
