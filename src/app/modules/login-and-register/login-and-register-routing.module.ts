import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAndRegisterComponent } from './login-and-register.component';

const routes: Routes = [
  {
    path: '',
    component: LoginAndRegisterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginAndRegisterRoutingModule {}
