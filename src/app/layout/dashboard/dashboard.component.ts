import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent {
togglePagesMenu: any;
closeSideMenu: any;
toggleSideMenu: any;
toggleTheme: any;
toggleNotificationsMenu: any;
closeNotificationsMenu: any;
toggleProfileMenu: any;
closeProfileMenu: any;
  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {}

  userName = sessionStorage.getItem('full name');
  isLogin = sessionStorage.getItem('token') ? true : false;

  logoutUser() {
    if (this.isLogin == true) {
      // if(confirm('are you sure you want to logout this user')){
      sessionStorage.clear();
      this.toastr.success('Logout Successfully');
      this.router.navigateByUrl('/login');
      location.reload();
      // }
    } else {
      console.error('Unauthorized user');
    }
  }
}
