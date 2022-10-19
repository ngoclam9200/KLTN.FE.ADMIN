import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  apiUrl=environment.apiUrl+"/Statistic"
 
  constructor( private http: HttpClient ,) { }
   
  getTurnOver()
  {
     
    return this.http.get(this.apiUrl+"/get-turnover")
  }
  getCostSalary()
  {
    return this.http.get(this.apiUrl+"/get-cost-salary")
  }
  getCostProduct()
  {
    return this.http.get(this.apiUrl+"/get-cost-product")
  }
 
}
