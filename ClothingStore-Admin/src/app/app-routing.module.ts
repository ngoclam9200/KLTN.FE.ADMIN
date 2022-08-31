import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { GeneralStatisticsComponent } from './components/general-statistics/general-statistics.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { StaffComponent } from './components/staff/staff.component';
import { TurnoverComponent } from './components/turnover/turnover.component';

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'product', component: ProductComponent },
  { path: 'general-statistics', component: GeneralStatisticsComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'turnover', component: TurnoverComponent },
  { path: 'order', component: OrderComponent },



  
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
