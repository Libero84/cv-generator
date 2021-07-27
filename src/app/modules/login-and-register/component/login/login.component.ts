import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../../core/services/login-service/login.service';
import { Token } from '../../../../models/token';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMsg } from '../../../../helper/errorMsg';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fg!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly loginService: LoginService) {}

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.fg.invalid) {
      return;
    }

    this.loginService.login(this.fg.getRawValue()).subscribe(
      (res: Token) => console.log('value form login', res),
      (err: HttpErrorResponse) => errorMsg(err)
    );
  }

  private initForm(): void {
    this.fg = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
