import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/auth/services/users.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { read } from '@popperjs/core';

@Component({
  selector: 'app-user-form',
  standalone: false,
  // imports: [],3
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent {

  userFormElement!: FormGroup
  user_id: any
  form_type: string = "new"
  user_payload: any

  constructor(
    private http: UsersService,
    private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private active_route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.user_id = this.active_route.snapshot.paramMap.get('user_id')
    this.userForm()
    this.getUser(this.user_id)
  }

  backBtn(){
    sessionStorage.removeItem('UserFormId')
    this.router.navigateByUrl('/users')
  }

  userForm(){
    this.userFormElement =  this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: [''],
      password_confirmation: [''],
    });
    // if (this.form_type =/) {

    // }
  }

  getUser(user_id: any){
    if (user_id) {
      this.http.get(`users/${user_id}`).subscribe((response: any) => {
        this.form_type = "edit"
        this.userFormElement.patchValue({
          name: response.data.name,
          email: response.data.email
        })
      }, err => {
        console.error(err)
      })
    }
  }

  makeUserPayload(){
    this.user_payload = {
      'name': this.userFormElement.value.name,
      'email': this.userFormElement.value.email,
      'password': this.userFormElement.value.password,
      'password_confirmation': this.userFormElement.value.password_confirmation,
    }
  }

  updateUser(){
    this.makeUserPayload()
    this.http.put(`users/${this.user_id}/edit`, this.user_payload).subscribe((response: any) => {
      (response.status === true)? this.responseTrue('Updated') : this.responseFalse(response)
      this.form_type = "new"
    }, err => {
      console.error(err.error)
    })
  }

  createUser(){
    this.makeUserPayload()
    this.http.post(`users/create`, this.user_payload).subscribe((response: any) => {
      (response.status === true)? this.responseTrue('Created') : this.responseFalse(response)

    }, err => {
      console.error(err.error)
    })
  }

  deleteUser(){
    this.http.delete(`users/${this.user_id}`).subscribe((response) => {
      (response.status === true)? this.responseTrue('Deleted') : this.responseFalse(response)
    }, err => {
      console.error(err.error)
    })
  }

  responseTrue(msg: string){
    this.toastr.success(`${msg} successfully`)
    this.router.navigateByUrl('users')
  }

  responseFalse(response: any){
    this.toastr.error('something went wrong')
    console.error(response)
  }
}
