import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private data: UsersService,
    private router: Router,
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
    this.data.register(val).subscribe((response: any) => {
      console.warn(response)
      if (response.status == true) {
        sessionStorage.setItem("token", response.token)
        this.router.navigateByUrl('home');
        location.reload()
      } else{
        console.log(response.errors)
      }
    }, err=>{
      console.log(err)
    })
  }
}
