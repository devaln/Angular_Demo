import { Component, OnInit } from '@angular/core';
import '@angular/localize/init'
import { UsersService } from './auth/services/users.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Authentiication';
  is_login: any

  constructor(
    private auth: AuthService,
  ) {}

  ngOnInit() {
    // isLogin = sessionStorage.getItem("token") ? true : false
    this.is_login = this.auth.isLoggedIn()
  }

}
