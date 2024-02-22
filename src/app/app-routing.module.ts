import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { IndexComponent } from './components/pages/users/index/index.component';
import { UserFormComponent } from './components/pages/users/user-form/user-form.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'users',
    component: IndexComponent
  },
  {
    path: 'user-form/:user_id',
    component: UserFormComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
