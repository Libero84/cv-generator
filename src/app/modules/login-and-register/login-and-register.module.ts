import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginAndRegisterRoutingModule } from './login-and-register-routing.module';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginAndRegisterComponent } from './login-and-register.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, LoginAndRegisterComponent],
  imports: [CommonModule, LoginAndRegisterRoutingModule, SharedModule],
})
export class LoginAndRegisterModule {}
