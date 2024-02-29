import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../auth/services/users.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-society-form',
  standalone: false,
  // imports: [],
  templateUrl: './society-form.component.html',
  styleUrl: './society-form.component.css'
})
export class SocietyFormComponent {
  society_form_element !: FormGroup
  society_id: any
  form_type: string = 'new'
  society_payload: any

  constructor(
    private fb: FormBuilder,
    private http: UsersService,
    private location: Location,
    private active_route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.society_id = this.active_route.snapshot.paramMap.get('society_id')
    this.societyForm()
    this.getSocieties(this.society_id)
  }

  backBtn() { this.location.back() } 

  societyForm(){
    this.society_form_element = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', [Validators.required, Validators.max(10)]],
      logo: [''],
      country: [''],
      state: [''],
      city: [''],
      location: [''],
      pincode: [''],
      builder_name: ['', [Validators.required]],
      builder_email: ['', [Validators.required, Validators.email]],
      builder_phone: ['', [Validators.required, Validators.max(10)]],
      is_active: [''],
    })
  }

  getSocieties(society_id: any) {
    this.http.get(`societies/${society_id}`).subscribe((response) => {
      console.log(response.data)
      this.form_type = 'edit'
      this.society_form_element.patchValue({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        logo: response.data.logo,
        country: response.data.country,
        state: response.data.state,
        city: response.data.city,
        location: response.data.location,
        pincode: response.data.pincode,
        builder_name: response.data.builder_name,
        builder_email: response.data.builder_email,
        builder_phone: response.data.builder_phone,
        is_active: response.data.is_active
      })
    }, err => {
      console.error(err.error.message)
    })
  }

  societyPayload() {
    this.society_payload = {
      "name": this.society_form_element.value.name,
      "email": this.society_form_element.value.email,
      "phone": this.society_form_element.value.phone,
      "logo": this.society_form_element.value.logo,
      "country": this.society_form_element.value.country,
      "state": this.society_form_element.value.state,
      "city": this.society_form_element.value.city,
      "location": this.society_form_element.value.location,
      "pincode": this.society_form_element.value.pincode,
      "builder_name": this.society_form_element.value.builder_name,
      "builder_email": this.society_form_element.value.builder_email,
      "builder_phone": this.society_form_element.value.builder_phone,
      "is_active": this.society_form_element.value.is_active
    }
  }

  updateSociety(){
    this.societyPayload()
    this.http.put(`societies/${this.society_id}/edit`, this.society_payload).subscribe((response: any) => {
      this.form_type = "new"
      this.responseStatus(response, "Updated", 'societies-forms')
    }, err => {
      this.toastr.error(err.error.message)
      console.error(err.error.message)
    })
  }

  createWing(){
    this.societyPayload()
    this.http.post(`societies/create`, this.society_payload).subscribe((response: any) => {
      this.responseStatus(response, "Created", 'register')
    }, err => {
      console.error(err.error)
    })
  }

  // deleteWing(){
  //   this.http.delete(`societies/${this.society_id}`).subscribe((response) => {
  //     this.responseStatus(response, "Deleted", 'societies-forms')
  //   }, err => {
  //     console.error(err.error)
  //   })
  // }

  responseStatus(response: any, msg: string, url: any){
    if(response.status == true){
      this.toastr.success(`${msg} successfully`)
      this.router.navigateByUrl(url)
    }else{
      this.toastr.error(response.error.message)
      console.error(response.error)
    }
  }
}
