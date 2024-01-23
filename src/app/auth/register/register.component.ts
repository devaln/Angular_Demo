import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private data: UsersService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  registerUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  get name() {
    return this.registerUser.get('name');
  }

  get email() {
    return this.registerUser.get('email');
  }

  get password() {
    return this.registerUser.get('password');
  }

  registerFrom(val: any){
    this.data.post('auth/register', val).subscribe((response: any) => {
      console.info('data',response)
      response.status == true? this.configureAuth(response) : this.ifFailed(response)
    }, err=>{
      console.log('123', err)
    })
  }

  configureAuth(response: any){
    sessionStorage.setItem("id", response.data.id)
    sessionStorage.setItem("full name", response.data.name)
    sessionStorage.setItem("email", response.data.email)
    sessionStorage.setItem("token", response.token)
    this.toastr.success(response.message)
    this.router.navigateByUrl('dashboard');
    // location.reload()
  }

  ifFailed(response: any){
    // console.error('error', response.error.err_msg)
    this.toastr.error(response.error.err_msg)
  }
}
