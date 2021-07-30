import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { MatTableModule } from '@angular/material/table';
import { CheckPermissionsDirective } from '../../core/direcitves/check-permissions.directive';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [UserComponent, CheckPermissionsDirective],
  imports: [CommonModule, UserRoutingModule, MatTableModule, MatSlideToggleModule],
})
export class UserModule {}
