import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fg!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  register(): void {
    if (this.fg.invalid) {
      return;
    }

    console.log('register data', this.fg.getRawValue());
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
}
