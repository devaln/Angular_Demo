import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../auth/services/users.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { read } from '@popperjs/core';
import { Location } from '@angular/common';

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
  file: any
  // society_id = sessionStorage.getItem('society_id')

  constructor(
    private http: UsersService,
    private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private active_route: ActivatedRoute,
    private location: Location,
  ){}

  ngOnInit(): void {
    this.user_id = this.active_route.snapshot.paramMap.get('user_id')
    this.userForm()
    this.getUser(this.user_id)
  }

  backBtn() { this.location.back() } 

  userForm(){
    this.userFormElement =  this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      dob: ['', [Validators.required]],
      mobile: ['', Validators.required],
      gender: ['', [Validators.required]],
      maritial_status: ['', [Validators.required]],
      password: [''],
      password_confirmation: [''],
      avatar: [''],
      is_admin: [''],
    });
  }

  getUser(user_id: any){
    if (user_id) {
      this.http.get(`users/${user_id}`).subscribe((response: any) => {
        this.form_type = "edit"
        this.userFormElement.patchValue({
          name: response.data.name,
          email: response.data.email,
          dob: response.data.dob,
          is_admin: response.data.is_admin,
          mobile: response.data.mobile,
          gender: response.data.gender,
          maritial_status: response.data.maritial_status,
        })
      }, err => {
        console.error(err)
      })
    }
  }

  uploadImage(event: any){
    this.file = event.target.files[0];
    // this.userFormElement.get('avatar').setValue(this.file, this.file.name)
  }

  makeUserPayload(){
    this.user_payload = {
      'name': this.userFormElement.value.name,
      'email': this.userFormElement.value.email,
      'password': this.userFormElement.value.password,
      'password_confirmation': this.userFormElement.value.password_confirmation,
      'dob': this.userFormElement.value.dob,
      'is_admin': this.userFormElement.value.is_admin,
      'mobile': this.userFormElement.value.mobile,
      'gender': this.userFormElement.value.gender,
      'maritial_status': this.userFormElement.value.maritial_status,
      // 'avatar': this.userFormElement.value.avatar,
    }
  }

  updateUser(){
    this.makeUserPayload()
    this.http.put(`users/${this.user_id}/edit`, this.user_payload).subscribe((response: any) => {
      this.responseStatus(response, "Updated", 'users')
      this.form_type = "new"
    }, err => {
      console.error(err.error)
    })
  }

  createUser(){
    this.makeUserPayload()
    this.http.post(`users/create`, this.user_payload).subscribe((response: any) => {
      this.responseStatus(response, "Created", 'users')
    }, err => {
      console.error(err.error)
    })
  }

  deleteUser(){
    this.http.delete(`users/${this.user_id}`).subscribe((response) => {
      this.responseStatus(response, "Deleted", 'users')
    }, err => {
      console.error(err.error)
    })
  }

  responseStatus(response: any, msg: string, url: any){
    if(response.status == true){
      this.toastr.success(`${msg} successfully`)
      this.router.navigateByUrl(url)
    }else{
      this.toastr.error(response.error)
      console.error(response.error)
    }
  }
}
