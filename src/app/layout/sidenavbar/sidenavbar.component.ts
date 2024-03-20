import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { UsersService } from 'src/app/components/pages/auth/services/users.service';
import Swal from 'sweetalert2';
import { catchError, retry } from 'rxjs/operators';
// import { Title } from '@angular/platform-browser';

interface sidebarMenu {
  path: string;
  cont: string;
  icon: string;
}

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {

  constructor(
    private data: AppComponent,
    private http: UsersService,
    private toastr: ToastrService
  ){}

  Title = this.data.title;

  sidebarMenu: sidebarMenu[] = [
    {
      path: 'dashboard',
      cont: 'Dashboard',
      icon: 'fa-tachometer-alt',
    },
    {
      path: 'users',
      cont: 'Users',
      icon: 'fa-users',
    },
  ]

  sidebar_dropdown: sidebarMenu[] =[
    {
      path: 'societies-forms/1',
      cont: 'Society',
      icon: 'fa-users',
    },
    {
      path: 'wings',
      cont: 'Wings',
      icon: 'fa-users',
    },
  ]

  handleClick() {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        this.logoutFunction()
      }
    });
  }

  logoutFunction(){
    this.http.post('auth/logout', sessionStorage.getItem('id')).subscribe((response) => {
      if (response.status == true) {
        console.log('===>', response)
        this.toastr.success('Logged Out')
        sessionStorage.clear()
        location.reload()
      }
    }, err => {
      this.toastr.error(err.error.message)
      console.error(err.error.message)
    })
  }
}
