import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CvComponent } from './cv.component';
import { MatIconModule } from '@angular/material/icon';
import { AddCvComponent } from './component/add-cv/add-cv.component';
import { DetailsCvComponent } from './component/details-cv/details-cv.component';
import { EducationComponent } from './component/education/education.component';
import { ExperiencesComponent } from './component/experiences/experiences.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [CvComponent, AddCvComponent, DetailsCvComponent, EducationComponent, ExperiencesComponent],
  imports: [
    CommonModule,
    CvRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
  ],
})
export class CvModule {}
