import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
// import { Title } from '@angular/platform-browser';

interface sidebarMenu {
  path: string;
  cont: string;
}

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent {

  constructor(
    private data: AppComponent,
  ){}

  Title = this.data.title;

  sidebarMenu: sidebarMenu[] = [
    {
      path: 'dashboard',
      cont: 'Dashboard',
    },
  ]

}
