import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
  ) { }

  isLoggedIn(){
    if (sessionStorage.getItem("token")) {
      this.router.navigateByUrl('/home')
      return true;
    } else {
      if (window.location.pathname == '/register') {
        this.router.navigateByUrl('/register')
      }else{
        this.router.navigateByUrl('/login')
      }
      return false;
    }
  }
}
