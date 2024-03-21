import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { IndexComponent } from './components/pages/users/index/index.component';
import { UserFormComponent } from './components/pages/users/user-form/user-form.component';
import { SocietyFormComponent } from './components/pages/society/society-form/society-form.component';
import { WingIndexComponent } from './components/pages/wings/wing-index/wing-index.component';
import { WingFormComponent } from './components/pages/wings/wing-form/wing-form.component';
import { FloorFormComponent } from './components/pages/floors/floor-form/floor-form.component';
import { FloorIndexComponent } from './components/pages/floors/floor-index/floor-index.component';
import { FlatsFormComponent } from './components/pages/flats/flats-form/flats-form.component';
import { FlatsIndexComponent } from './components/pages/flats/flats-index/flats-index.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'societies-forms/:society_id', component: SocietyFormComponent },
  { path: 'users', component: IndexComponent },
  { path: 'user-form/:user_id', component: UserFormComponent },
  { path: 'wings', component: WingIndexComponent },
  { path: 'wing-form/:wing_id', component: WingFormComponent },
  { path: 'floors', component: FloorIndexComponent },
  { path: 'floors-form/:floor_id', component: FloorFormComponent },
  { path: 'flats', component: FlatsIndexComponent },
  { path: 'flats-form/:flat_id', component: FlatsFormComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
