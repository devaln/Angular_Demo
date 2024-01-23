import { Component } from '@angular/core';
import { UsersService } from 'src/app/auth/services/users.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor(
    private http: UsersService,
  ){}


  UserList(){
    this.http.get("users").subscribe((response: any)=> {
      console.log(response)
    })
  }
}
