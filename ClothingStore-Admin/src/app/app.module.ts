import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule} from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon';
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
import {MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ProductComponent } from './components/product/product.component';
 

registerLocaleData(hi);
@NgModule({
  declarations: [
    AppComponent,
    StaffComponent,
    CustomerComponent,
    SignInComponent,
    LayoutComponent,
    ProductComponent,
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
    // NgxDatatableModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    
    
    
  
  ],
  providers: [   { provide: NZ_I18N, useValue: hi_IN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
