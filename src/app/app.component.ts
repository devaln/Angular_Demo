import { Component, OnInit } from '@angular/core';
import '@angular/localize/init'
import { UsersService } from './components/pages/auth/services/users.service';
import { AuthService } from './components/pages/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public current: number = 1;
  public perPage = 10
  // public total: number = 18;
  public items = [...Array(180).keys()].map(x => `item ${++x}`)
  public itemsToDisplay: string[] = []
  public total = Math.ceil(this.items.length / this.perPage)

  title = 'DevTools';
  is_login: any

  constructor(
    private auth: AuthService,
  ) {}

  ngOnInit() {
    this.is_login = this.auth.isLoggedIn()
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public onGoTo(page: number): void {
    this.current = page
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public onNext(page: number): void {
    this.current = page + 1
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public onPrevious(page: number): void {
    this.current = page - 1
    this.itemsToDisplay = this.paginate(this.current, this.perPage)
  }

  public paginate(current: number, perPage: number): string[] {
    return [...this.items.slice((current - 1) * perPage).slice(0, perPage)]
  }
}
