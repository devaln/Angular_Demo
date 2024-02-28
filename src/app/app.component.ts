import { Component, OnInit } from '@angular/core';
import '@angular/localize/init'
import { UsersService } from './components/pages/auth/services/users.service';
import { AuthService } from './components/pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'DevTools';
  is_login: any

  constructor(
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.is_login = this.auth.isLoggedIn()
  }

  logoutUser() {
    if (this.is_login == true) {
      // if(confirm('are you sure you want to logout this user')){
      sessionStorage.clear();
      // this.toastr.success('Logout Successfully');
      // this.router.navigateByUrl('/login');
      location.reload();
      // }
    } else {
      console.error('Unauthorized user');
    }
  }
}
