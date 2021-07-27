import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../../core/services/register-service/register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMsg } from '../../../../helper/errorMsg';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fg!: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly registerService: RegisterService) {}

  register(): void {
    if (this.fg.invalid) {
      return;
    }

    this.registerService.register(this.fg.getRawValue()).subscribe(
      (res) => console.log('data from register', res),
      (err: HttpErrorResponse) => errorMsg(err)
    );
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
