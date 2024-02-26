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
      this.router.navigateByUrl('/dashboard')
      return true;
    } else {
      if (window.location.pathname == '/register') {
        this.router.navigateByUrl('/register')
      }
      else if (window.location.pathname == '/societies') {
        this.router.navigateByUrl('/societies')
      }
      else if (window.location.pathname == '/societies-forms') {
        this.router.navigateByUrl('/societies-forms')
      }
      else {
        this.router.navigateByUrl('/login')
      }
      return false;
    }
  }
}
