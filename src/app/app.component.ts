import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cv-generator-frontend';

  constructor(private readonly router: Router, private readonly authSersvice: AuthService) {
    debugger;
    if (this.authSersvice.checkLogin()) {
      this.shouldRouterToUser();
    } else {
      this.router.navigateByUrl('/login-and-register');
    }
  }

  private shouldRouterToUser(): void {
    if (location.pathname === '/') {
      this.router.navigateByUrl('/user');
    }
  }
}
