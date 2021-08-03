import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvRoutingModule } from './cv-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { CvComponent } from './cv.component';
import { MatIconModule } from '@angular/material/icon';
import { AddCvComponent } from './component/add-cv/add-cv.component';
import { UpdateCvGenerationComponent } from './component/update-cv-generation/update-cv-generation.component';
import { DetailsCvComponent } from './component/details-cv/details-cv.component';
import { EducationComponent } from './component/education/education.component';
import { ExperiencesComponent } from './component/experiences/experiences.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    CvComponent,
    AddCvComponent,
    UpdateCvGenerationComponent,
    DetailsCvComponent,
    EducationComponent,
    ExperiencesComponent,
  ],
  imports: [
    CommonModule,
    CvRoutingModule,
    SharedModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
  ],
})
export class CvModule {}
