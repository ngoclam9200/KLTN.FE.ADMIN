import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  apiUrl=environment.apiUrl+"/Category"
 
  constructor( private http: HttpClient ,) { }
  getHeader()
  {
    let headers = new HttpHeaders();
    var token = sessionStorage.getItem('token');
     
    
    return headers = headers.set('Access-Control-Allow-Origin', '*').set('Authorization', `Bearer ${token}`);
  }
  getAllCategory()
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/get-all-category", {headers:headers})
  }
  
  createCategory(category:any)
  {
    let headers=this.getHeader()
    return this.http.post(this.apiUrl+"/create-category",category, {headers:headers})
  }
  deleteCategory(id:any)
  {
    let headers=this.getHeader()
    return this.http.delete(this.apiUrl+"/delete-category/"+id, {headers:headers})
  }
  editCategory(role:any)
  {
    let headers=this.getHeader()
    return this.http.put(this.apiUrl+"/edit-category/",role, {headers:headers})
  }
  searchCategory(category:any)
  {
    let headers=this.getHeader()
    return this.http.get(this.apiUrl+"/search-category-by-name/"+category, {headers:headers})
  }
}
