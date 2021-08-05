import { Component, OnInit } from '@angular/core';
import { CvService } from './service/cv.service';
import { Cv } from '../../models/cv';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ShareCvDataService } from '../../helper/share-cv-data.service';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'createdAt', 'updatedAt'];
  allCvs: Cv[] = [];

  constructor(
    private readonly cvService: CvService,
    private readonly router: Router,
    private readonly shareCvData: ShareCvDataService
  ) {}

  ngOnInit(): void {
    this.cvService.getCvAll().subscribe((res: Cv[]) => (this.allCvs = res));
  }

  addOrEditCv(data: Cv | null): void {
    this.shareCvData.setData(data);
    this.router.navigateByUrl('/cv/add');
  }

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
