import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth-service/auth.service';
import { Observable } from 'rxjs';
import { Credentials } from './models/credentials';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cv-generator-frontend';
  isUserData$: Observable<Credentials | null>;

  constructor(private readonly authService: AuthService) {
    this.isUserData$ = this.authService.isUserData$;
  }

  logout(): void {
    this.authService.logout();
  }
}
