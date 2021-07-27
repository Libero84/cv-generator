import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.scss'],
})
export class LoginAndRegisterComponent {
  isLoginView: boolean = true;

  toggleView(isLogin: boolean): void {
    this.isLoginView = isLogin;
  }
}
