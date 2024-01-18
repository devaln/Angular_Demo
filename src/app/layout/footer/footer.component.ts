import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <!-- Footer -->
    <footer class="sticky-footer bg-white">
        <div class="container my-auto">
            <div class="copyright text-center my-auto">
                <span>copyright &copy;
                    <script> document.write(new Date().getFullYear()); </script> - developed by
                    <b><a href="/dashboard" target="_blank">indrijunanda</a></b>
                </span>
            </div>
        </div>
    </footer>
    <!-- Footer -->
  `,
  styles: [
  ]
})
export class FooterComponent {

}
