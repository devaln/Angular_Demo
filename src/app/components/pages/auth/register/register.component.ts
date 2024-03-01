import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public societies: any
  public valueNull = null

  constructor(
    private http: UsersService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
      this.getSocieties();
  }

  societyForm(society_id: any){
    this.router.navigateByUrl(`societies-forms/`)
  }

  registerUser = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    password_confirmation: new FormControl('', [Validators.required]),
    society_id: new FormControl('', [Validators.required])
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

  get password_confirmation() {
    return this.registerUser.get('password_confirmation');
  }

  get society_id() {
    return this.registerUser.get('society_id');
  }

  registerFrom(val: any){
    this.http.post('auth/register', val).subscribe((response: any) => {
      // console.info(response)
      response.status == true? this.responseTrue(response) : this.responseFalse(response)
    }, err=>{
      console.log('123', err)
    })
  }


  responseTrue(response: any){
    sessionStorage.setItem("id", response.data.id)
    sessionStorage.setItem("full name", response.data.name)
    sessionStorage.setItem("email", response.data.email)
    sessionStorage.setItem("token", response.token)
    this.toastr.success(response.message)
    this.router.navigateByUrl('dashboard');
    location.reload()
  }

  responseFalse(response: any){
    this.toastr.error(response.error.err_msg)
    console.log(sessionStorage.getItem('society_id'))
  }

  getSocieties() {
    this.http.get(`societies`).subscribe((response: any) => {
      this.societies = response.data
      // console.log(this.societies[0].name)
    })
  }
}
