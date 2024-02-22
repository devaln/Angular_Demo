import { Component } from '@angular/core';

interface cardContents {
  title: string,
  amt: number,
  icon: string,
  icon_color: string,
  raising_icon: string,
  percent: number,
  since: string,
  no_gutters: boolean,
}

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  cardContents: cardContents[] = [
    {
      title: 'Earnings(Monthly)',
      amt: 40000,
      icon: 'fas fa-calendar',
      icon_color: 'text-primary',
      raising_icon: 'arrow-up',
      percent: 3.48,
      since: 'last Month',
      no_gutters: false,
    },
    {
      title: 'sales',
      amt: 650,
      icon: 'fas fa-shopping-cart',
      icon_color: 'text-success',
      raising_icon: 'arrow-up',
      percent: 12,
      since: 'last years',
      no_gutters: true,
    },
    {
      title: 'New User',
      amt: 366,
      icon: 'fas fa-users',
      icon_color: 'text-info',
      raising_icon: 'arrow-up',
      percent: 3.48,
      since: 'last Month',
      no_gutters: true,
    },
    {
      title: 'pending Requests',
      amt: 18,
      icon: 'fas fa-comments',
      icon_color: 'text-warning',
      raising_icon: 'arrow-up',
      percent: 1.10,
      since: 'last Month',
      no_gutters: true,
    },
  ]

}
