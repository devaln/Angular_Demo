import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  info: any;

  constructor(private data: UsersService, private router: Router) {
    this.data.userData().subscribe((userInfo) => {
      this.info = userInfo;
    });
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser(data: any) {
    this.data.login(data).subscribe((info) => {
      console.warn(info);
      this.router.navigateByUrl('home');
    });
  }
}
