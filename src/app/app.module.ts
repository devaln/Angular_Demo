import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { UserFormComponent } from "./components/pages/users/user-form/user-form.component";
import { AppComponent } from './app.component';
import { HeaderComponent } from "./layout/header/header.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SidenavbarComponent } from "./layout/sidenavbar/sidenavbar.component";
import { CardsComponent } from "./dashboard/dashboard-components/cards/cards.component";
import { AlertsComponent } from "./components/basic/alerts/alerts.component";
import { BreadcrumbComponent } from "./dashboard/dashboard-components/breadcrumb/breadcrumb.component";
import { IndexComponent } from './components/pages/users/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    SidenavbarComponent,
    CardsComponent,
    AlertsComponent,
    DashboardComponent,
    BreadcrumbComponent,
    IndexComponent,
    UserFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressAnimation: 'increasing',
      progressBar: true
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
