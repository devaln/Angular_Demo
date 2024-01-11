import { Component } from '@angular/core';
import '@angular/localize/init'
import { UsersService } from './auth/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'demo2';
}
