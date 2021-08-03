import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from '../../service/cv.service';
import { Cv } from '../../../../models/cv';
import { HttpErrorResponse } from '@angular/common/http';
import { errorMsg } from '../../../../helper/errorMsg';

@Component({
  selector: 'app-details-cv',
  templateUrl: './details-cv.component.html',
  styleUrls: ['./details-cv.component.scss'],
})
export class DetailsCvComponent implements OnInit {
  detailsCv!: Cv;

  constructor(private readonly router: Router, private readonly cvService: CvService) {}

  ngOnInit(): void {
    this.cvService.getCv(this.lastItemInUrl(this.router.url)).subscribe(
      (res: Cv) => (this.detailsCv = res),
      (error: HttpErrorResponse) => errorMsg(error)
    );
  }

  private lastItemInUrl(url: string): number {
    return +url.substring(url.lastIndexOf('/') + 1);
  }
}
