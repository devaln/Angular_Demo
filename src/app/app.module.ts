import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { PagesModule } from "./components/pages/pages.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./layout/header/header.component";
import { DashboardComponent } from "./layout/dashboard/dashboard.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { SidenavbarComponent } from "./layout/sidenavbar/sidenavbar.component";
import { CardsComponent } from "./layout/dashboard/dashboard-components/cards/cards.component";
import { AlertsComponent } from "./components/basic/alerts/alerts.component";
import { BreadcrumbComponent } from "./layout/dashboard/dashboard-components/breadcrumb/breadcrumb.component";
import { SpinnerComponent } from "./components/basic/loader/spinner/spinner.component";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoaderInterceptor } from "./components/basic/loader/interceptors/loader.interceptor";

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
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    PagesModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      closeButton: true,
      progressAnimation: 'increasing',
      progressBar: true
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
