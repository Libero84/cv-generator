import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fg!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.fg.invalid) {
      return;
    }

    this.authService.login(this.fg.getRawValue());
  }

  private initForm(): void {
    this.fg = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
