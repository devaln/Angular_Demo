import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../auth/services/users.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-flats-form',
  standalone: false,
  // imports: [],
  templateUrl: './flats-form.component.html',
  styleUrl: './flats-form.component.css'
})
export class FlatsFormComponent {
  flat_form!: FormGroup
  form_type: string = "new"
  flat_id: any
  wings: any
  floors:any
  users: any
  flat_payload: any

  constructor(
    private https: UsersService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private active_route: ActivatedRoute,
    private router: Router,
    private location: Location
  ){
    this.flat_form = this.fb.group({
      flat_no: ['', [Validators.required]],
      area: ['', [Validators.required]],
      wing_id: [''],
      floor_id: [''],
      owner_id: ['']
    })
  }

  ngOnInit(): void {
    this.flat_id = this.active_route.snapshot.paramMap.get('flat_id');
    this.getFlat(this.flat_id)
    this.getWing()
    this.getFloors()
    this.getOwners()
  }

  backBtn(){ this.location.back() }

  getFlat(flat_id: any){
    if(flat_id){
      this.https.get(`flats/${flat_id}`).subscribe((response: any) => {
        console.log(response)
        this.form_type = "edit";
        this.flat_form.patchValue({
          'flat_no': response.data.flat_no,
          'area': response.data.area,
          'wing_id': response.data.wing_id,
          'floor_id': response.data.floor_id,
          'owner_id': response.data.owner_id
        })
      }, err => {
        console.error(err.error.message)
      })
    }
  }

  getWing(){
    this.https.get('wings').subscribe((response: any) => {
      this.wings = response.data
    }, err => {
      console.error(err.error.message)
    })
  }

  getFloors(){
    this.https.get('floors').subscribe((response: any) => {
      this.floors = response.data
    }, err => {
      console.error(err.error.message)
    })
  }

  getOwners(){
    this.https.get('users').subscribe((response: any) => {
      this.users = response.data
    }, err => {
      console.error(err.error.message)
    })
  }

  makePayload(){
    this.flat_payload = {
      'flat_no': this.flat_form.value.flat_no,
      'area': this.flat_form.value.area,
      'wing_id': this.flat_form.value.wing_id,
      'floor_id': this.flat_form.value.floor_id,
      'owner_id': this.flat_form.value.owner_id,
    }
  }

  updateFlat(){
    this.makePayload()
    this.https.put(`flats/${this.flat_id}/edit`, this.flat_payload).subscribe((response: any) => {
      this.responseStaus(response, 'Updated', 'flats')
    }, err => {
      console.error(err.error.message)
    })
  }

  createFlat(){
    this.makePayload()
    this.https.post('flats/create', this.flat_payload).subscribe((response: any) => {
      this.responseStaus(response, 'Created', 'flats')
    }, err => { console.error(err.error.message) })
  }

  responseStaus(response: any, msg: string, url: string){
    if(response.status == true){
      this.router.navigateByUrl(url)
      this.toastr.success(`${msg} Successfully`)
    } else {
      this.toastr.error(response.error.message)
      console.error(response.error)
    }
  }
}
