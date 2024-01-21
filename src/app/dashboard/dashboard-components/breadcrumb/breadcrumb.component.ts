import { Component } from '@angular/core';

interface breadcrumb {
    path: string,
    value: string,
    ariaCurrentPage: boolean,
    is_active: boolean,
}
@Component({
  selector: 'app-breadcrumb',
  template: `
    <ol class="breadcrumb">
        <li class="breadcrumb-item {{ (val.is_active == true)? 'active' : '' }}" *ngFor="let val of breadcrumb">
            <a href="{{ val.path }}">{{ val.value }}</a>
        </li>
        <!-- <li class="breadcrumb-item active" aria-current="page">Dashboard</li> -->
    </ol>
  `,
  styles: [
    `
    ol li .breadcrumb-item{
        text-transform: capitialize;
    }
    `
  ],
})
export class BreadcrumbComponent {

    breadcrumb: breadcrumb[] = [
        {
            path: '/',
            value: 'home',
            ariaCurrentPage: false,
            is_active: false,
        },
        {
            path: '',
            value: 'dashboard',
            ariaCurrentPage: true,
            is_active: true,
        },
    ]
}
