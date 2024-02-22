import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  info: any;

  constructor(
    private data: UsersService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    // this.toastr.success('Hello world!');
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser(data: any) {
    this.data.post('auth/login', data).subscribe((response : any) => {
      console.info("response", response)
      response.status == true ? this.configureAuth(response) : this.ifAuthFailed(response)
    }, err=>{
      console.error(err)
    })
  }

  configureAuth(response: any){
    sessionStorage.setItem("id", response.data.id)
    sessionStorage.setItem("full name", response.data.name)
    sessionStorage.setItem("email", response.data.email)
    sessionStorage.setItem("token", response.token)
    this.loginForm.reset()
    this.toastr.success('Welcome ' + response.data.name);
    this.router.navigateByUrl('dashboard');
    location.reload()
  }

  ifAuthFailed(response: any){
    // console.error(response.errors)
    this.toastr.error(response.error.message)
  }

}
