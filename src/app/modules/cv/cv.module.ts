import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CvComponent } from './cv.component';

@NgModule({
  declarations: [CvComponent],
  imports: [CommonModule, CvRoutingModule, SharedModule, MatTableModule],
})
export class CvModule {}
