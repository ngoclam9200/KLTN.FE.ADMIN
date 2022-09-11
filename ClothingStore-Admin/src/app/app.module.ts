import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { StaffComponent } from './components/staff/staff.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { hi_IN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import hi from '@angular/common/locales/hi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CustomerComponent } from './components/customer/customer.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/product/product.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateEditStaffComponent } from './components/staff/create-edit-staff/create-edit-staff.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { GeneralStatisticsComponent } from './components/general-statistics/general-statistics.component';
import { CategoryComponent } from './components/category/category.component';
import { TurnoverComponent } from './components/turnover/turnover.component';
import { OrderComponent } from './components/order/order.component';
import { CreateEditProductComponent } from './components/product/create-edit-product/create-edit-product.component';
import { CreateEditCategoryComponent } from './components/category/create-edit-category/create-edit-category.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ShowStaffComponent } from './components/staff/show-staff/show-staff.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { ShowCustomerComponent } from './components/customer/show-customer/show-customer.component';
// import { CreateEditCustomerComponent } from './components/customer/create-edit-customer/create-edit-customer.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';
import { ShowProductComponent } from './components/product/show-product/show-product.component';
import { ShowCategoryComponent } from './components/category/show-category/show-category.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatComponent } from './components/chat/chat.component';
import {MatBadgeModule } from '@angular/material/badge';
registerLocaleData(hi);
@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    CustomerComponent,
    SignInComponent,
    LayoutComponent,
    ProductComponent,
    CreateEditStaffComponent,
    GeneralStatisticsComponent,
    CategoryComponent,
    TurnoverComponent,
    OrderComponent,
    CreateEditProductComponent,
    CreateEditCategoryComponent,
    ShowStaffComponent,
    ShowCustomerComponent,
    // CreateEditCustomerComponent,
    EditCustomerComponent,
    ShowProductComponent,
    ShowCategoryComponent,
    ProfileComponent,
    ChatComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    MatProgressBarModule,
    MatDividerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatBadgeModule,





  ],
  providers: [{ provide: NZ_I18N, useValue: hi_IN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
