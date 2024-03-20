import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { PaginationModule } from '../basic/pagination/pagination.module';
import { ReactiveFormsModule } from "@angular/forms";


import { IndexComponent } from './users/index/index.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { SocietyFormComponent } from './society/society-form/society-form.component';
import { WingIndexComponent } from './wings/wing-index/wing-index.component';
import { WingFormComponent } from './wings/wing-form/wing-form.component';
import { FloorFormComponent } from './floors/floor-form/floor-form.component';
import { FloorIndexComponent } from './floors/floor-index/floor-index.component';

@NgModule({
  declarations: [
    IndexComponent,
    UserFormComponent,
    SocietyFormComponent,
    WingIndexComponent,
    WingFormComponent,
    FloorFormComponent,
    FloorIndexComponent
  ],
  imports: [
    CommonModule,
    AuthModule,
    PaginationModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
