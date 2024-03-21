import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../auth/services/users.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-floor-form',
  standalone: false,
  // imports: [],
  templateUrl: './floor-form.component.html',
  styleUrl: './floor-form.component.css'
})
export class FloorFormComponent {
  floors_form !: FormGroup;
  form_type: string = "new";
  wings: any
  floor_id: any
  floor_payload: any

  constructor(
    private _https: UsersService,
    private location: Location,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private active_route: ActivatedRoute
  ){
    this.floors_form = this.fb.group({
      wing_id: ['', [Validators.required]],
      floor_no: ['', [Validators.required]],
      unit_per_floor: [''],
      unit_serial_no: [''],
    })
  }

  ngOnInit(): void {
    this.floor_id = this.active_route.snapshot.paramMap.get('floor_id');
    this.getWings()
    this.getFloor(this.floor_id)
  }

  backBtn(){ this.location.back() }

  getWings(){
    this._https.get('wings').subscribe((response: any) => {
      console.log(response.data)
      this.wings = response.data
    }, err => { console.error(err.error.message) })
  }

  getFloor(floor_id: any){
    if(floor_id){
      this._https.get(`floors/${floor_id}`).subscribe((response: any) => {
        if(response.status == true){
          // console.log(response.data)
          this.form_type = 'edit'
          this.floors_form.patchValue({
            floor_no: response.data.floor_no,
            wing_id: response.data.wings.id,
            unit_per_floor: response.data.unit_per_floor,
            unit_serial_no: response.data.unit_serial_no
          })
        }
      }, err => {
        console.error(err.error.message)
      })
    }
  }

  makePayload(){
    this.floor_payload = {
      'floor_no': this.floors_form.value.floor_no,
      'wing_id': this.floors_form.value.wing_id,
      'unit_per_floor': this.floors_form.value.unit_per_floor,
      'unit_serial_no': this.floors_form.value.unit_serial_no
    }
  }

  updateFloor(){
    this.makePayload()
    this._https.put(`floors/${this.floor_id}/edit`, this.floor_payload).subscribe((response) => {
      console.log(response)
      this.responseStatus(response, 'Updated', 'floors')
    }, err => {
      console.error(err.error.message)
    })
  }

  createFloor(){
    this.makePayload()
    this._https.post(`floors/create`, this.floor_payload).subscribe((response: any) => {
      console.log(response)
      this.responseStatus(response, 'Created', 'floors')
    }, err => {
      console.error(err.error.message)
    })
  }

  responseStatus(response: any, msg: string, url: string){
    if(response.status == true){
      this.toastr.success(`${msg} Successfully`)
      this.router.navigateByUrl(url)
    } else {
      this.toastr.error(response.error.message)
      console.error(response.error)
    }
  }
}
