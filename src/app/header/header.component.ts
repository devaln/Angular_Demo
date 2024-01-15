import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router,
  ){ }

  isLogin = sessionStorage.getItem("token") ? true : false

  logoutUser() {
    if (this.isLogin == true) {
      if(confirm('are you sure you want to logout this user')){
        sessionStorage.clear()
        this.router.navigateByUrl('/login')
        location.reload()
      }
    } else {
      console.error('')
    }
  }
}
