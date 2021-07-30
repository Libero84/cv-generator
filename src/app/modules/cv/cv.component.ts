import { Component, OnInit } from '@angular/core';
import { CvService } from './service/cv.service';
import { Cv } from '../../models/cv';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'createdAt', 'updatedAt'];
  allCvs: Cv[] = [];

  constructor(private readonly cvService: CvService) {}

  ngOnInit(): void {
    this.cvService.getCvAll().subscribe((res: Cv[]) => (this.allCvs = res));
  }

  addCv(): void {}
}
