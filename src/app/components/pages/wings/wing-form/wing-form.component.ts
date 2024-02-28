import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsersService } from '../../auth/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wing-form',
  standalone: false,
  templateUrl: './wing-form.component.html',
  styleUrl: './wing-form.component.css'
})

export class WingFormComponent {

  wingFormElement!: FormGroup
  wing_id: any
  form_type: string = "new"
  wing_payload: any

  constructor(
    private http: UsersService,
    private _fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private active_route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.wing_id = this.active_route.snapshot.paramMap.get('wing_id')
    this.userForm()
    this.getUser(this.wing_id)
  }

  backBtn() { this.location.back() } 

  userForm(){
    this.wingFormElement =  this._fb.group({
      block_name: ['', [Validators.required]],
      is_active: ['', [Validators.required]],
      society_id: [''],
    });
  }

  getUser(wing_id: any){
    if (wing_id) {
      this.http.get(`wings/${wing_id}`).subscribe((response: any) => {
        this.form_type = "edit"
        console.log('===>', response)
        this.wingFormElement.patchValue({
          block_name: response.data.block_name,
          is_active: response.data.is_active,
          society_id: response.data.society_id,
        })
      }, err => {
        console.error(err)
      })
    }
  }

  makeUserPayload(){
    this.wing_payload = {
      'block_name': this.wingFormElement.value.block_name,
      'is_active': this.wingFormElement.value.is_active,
    }
  }

  updateWing(){
    this.makeUserPayload()
    this.http.put(`wings/${this.wing_id}/edit`, this.wing_payload).subscribe((response: any) => {
      this.form_type = "new"
      this.responseStatus(response, "Updated", 'wings')
    }, err => {
      console.error(err.error)
    })
  }

  createWing(){
    this.makeUserPayload()
    this.http.post(`wings/create`, this.wing_payload).subscribe((response: any) => {
      this.responseStatus(response, "Created", 'wings')
    }, err => {
      console.error(err.error)
    })
  }

  deleteWing(){
    this.http.delete(`wings/${this.wing_id}`).subscribe((response) => {
      this.responseStatus(response, "Deleted", 'wings')
    }, err => {
      console.error(err.error)
    })
  }

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
