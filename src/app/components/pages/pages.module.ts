import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { PaginationModule } from '../basic/pagination/pagination.module';
import { ReactiveFormsModule } from "@angular/forms";


import { IndexComponent } from './users/index/index.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { SocietyFormComponent } from './society/society-form/society-form.component';

@NgModule({
  declarations: [
    IndexComponent,
    UserFormComponent,
    SocietyFormComponent,
  ],
  imports: [
    CommonModule,
    AuthModule,
    PaginationModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
