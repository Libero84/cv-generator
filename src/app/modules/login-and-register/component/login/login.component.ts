import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  fg!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  login(): void {
    if (this.fg.invalid) {
      return;
    }

    console.log('login credentials', this.fg.getRawValue()); // todo write services
  }

  private initForm(): void {
    this.fg = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
