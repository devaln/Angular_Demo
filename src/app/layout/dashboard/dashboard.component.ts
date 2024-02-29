import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent {

  constructor(
    private toastr: ToastrService,
    private router: Router,
  ) {}

  userName = sessionStorage.getItem('full name');
  isLogin = sessionStorage.getItem('token') ? true : false;

}
