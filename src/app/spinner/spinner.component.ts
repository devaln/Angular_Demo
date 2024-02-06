import { Component, ViewEncapsulation  } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-spinner',
  standalone: false,
  // imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SpinnerComponent {
  constructor(public loader: LoaderService) {}
}
