import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../auth/services/users.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { BASE_URL } from 'src/app/config-app';
import { Location } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: false,
  // imports: [],3
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent {

  userFormElement: FormGroup
  user_id = this.active_route.snapshot.paramMap.get('user_id')
  form_type: string = "new"
  user_payload = new FormData();
  file: any
  img_url: any

  constructor(
    private _http: UsersService,
    private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private active_route: ActivatedRoute,
    private location: Location,
  ){
    this.userFormElement = this._fb.group({
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

  ngOnInit(): void {
    this.getUser(this.user_id)
  }

  backBtn() { this.location.back() } 

  getUser(user_id: any){
    if (user_id) {
      this._http.get(`users/${user_id}`).subscribe((response: any) => {
        this.form_type = "edit"
        this.img_url = BASE_URL+response.data.avatar;
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
    if (event.target.files[0]) {
      this.file = event.target.files[0] as File;
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = (event: any) => {
        this.img_url = event.target.result;
      };
   }
    console.log(this.file)
  }

  makeUserPayload(){
    this.user_payload.set('name', this.userFormElement.controls['name'].value);
    this.user_payload.set('email', this.userFormElement.controls['email'].value);
    this.user_payload.set('password', this.userFormElement.value.password);
    this.user_payload.set('password_confirmation', this.userFormElement.value.password_confirmation);
    this.user_payload.set('dob', this.userFormElement.value.dob);
    this.user_payload.set('is_admin', this.userFormElement.value.is_admin);
    this.user_payload.set('mobile', this.userFormElement.value.mobile);
    this.user_payload.set('gender', this.userFormElement.value.gender);
    this.user_payload.set('maritial_status', this.userFormElement.value.maritial_status);
    this.user_payload.set('avatar', this.file);
  }

  updateUser(){
    this.makeUserPayload()
    // this.user_payload.append('_method', 'put');
    this._http.put(`users/${this.user_id}/edit`, this.user_payload).subscribe((response: any) => {
      this.responseStatus(response, "Updated", 'users')
      // this.form_type = "new"
    }, err => {
      console.error(err.error)
    })
  }

  createUser(){
    this.makeUserPayload()
    this._http.post(`users/create`, this.user_payload).subscribe((response: any) => {
      this.responseStatus(response, "Created", 'users')
    }, err => {
      console.error(err.error)
    })
  }

  deleteUser(){
    this._http.delete(`users/${this.user_id}`).subscribe((response) => {
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
