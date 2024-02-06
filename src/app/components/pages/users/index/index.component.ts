import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  data: any

  constructor(
    private http: UsersService,
    private router: Router,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.userList()
  }

  userList(){
    this.http.get("users").subscribe((response: any)=> {
      console.log(response)
      this.data = response.data
    })
  }

  editUser(user_id: any){
    // userId? sessionStorage.setItem('UserFormId', userId) : sessionStorage.removeItem('UserFormId')
    this.router.navigateByUrl(`/user-form/${user_id}`)
  }

  deleteUser(user_id: any){
    this.http.delete(`users/${user_id}`).subscribe((response) => {
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
