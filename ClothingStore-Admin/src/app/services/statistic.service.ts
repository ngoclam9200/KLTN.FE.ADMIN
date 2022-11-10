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
 getCostVoucher()
 {
  return this.http.get(this.apiUrl+"/get-cost-voucher")
 }
 getCountDelivered()
 {
  return this.http.get(this.apiUrl+"/get-count-delivered")
 }
 getCountCancle()
 {
  return this.http.get(this.apiUrl+"/get-count-cancel")
 }
 getAllCountOrder()
 {
  return this.http.get(this.apiUrl+"/get-all-count-order")
 }
 getCountNewCustomer()
 {
  return this.http.get(this.apiUrl+"/get-new-customer")
 }
 getCountProdByCategory()
 {
  return this.http.get(this.apiUrl+"/get-count-product-by-category")
 }
 getCountProdSoldByCategory()
 {
  return this.http.get(this.apiUrl+"/get-count-product-sold-by-category")
 }
}
