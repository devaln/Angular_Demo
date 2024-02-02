import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

export class IndexComponent {
  constructor(
    private http: UsersService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.userList()
  }

  data: any
  userList(){
    this.http.get("users").subscribe((response: any)=> {
      console.log(response)
      this.data = response.data
    })
  }

  editUser(userId: any){
    // userId? sessionStorage.setItem('UserFormId', userId) : sessionStorage.removeItem('UserFormId')
    this.router.navigateByUrl(`/user-form/${userId}`)
  }
}
