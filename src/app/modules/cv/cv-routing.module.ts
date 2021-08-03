import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvComponent } from './cv.component';
import { DetailsCvComponent } from './component/details-cv/details-cv.component';

const routes: Routes = [
  {
    path: '',
    component: CvComponent,
  },
  {
    path: ':id',
    component: DetailsCvComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvRoutingModule {}
