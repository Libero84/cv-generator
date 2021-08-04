import { Component, OnInit } from '@angular/core';
import { CvService } from './service/cv.service';
import { Cv } from '../../models/cv';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'createdAt', 'updatedAt'];
  allCvs: Cv[] = [];

  constructor(private readonly cvService: CvService, private readonly router: Router) {}

  ngOnInit(): void {
    this.cvService.getCvAll().subscribe((res: Cv[]) => (this.allCvs = res));
  }

  addCv(): void {
    this.router.navigateByUrl('/cv/add');
  }

  editCv(cvId: number): void {}

  deleteCv(cvId: number): void {
    this.cvService
      .deleteCv(cvId)
      .pipe(switchMap(() => this.cvService.getCvAll()))
      .subscribe((res: Cv[]) => (this.allCvs = res));
  }

  displayCvDetails(row: Cv): void {
    this.router.navigateByUrl('cv/' + row.id);
  }
}
