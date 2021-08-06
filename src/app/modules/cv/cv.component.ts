import { Component, OnInit } from '@angular/core';
import { CvService } from './service/cv.service';
import { Cv } from '../../models/cv';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ShareCvDataService } from '../../helper/share-cv-data.service';
import { UploadService } from '../../core/services/upload-service/upload.service';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'username', 'createdAt', 'updatedAt'];
  allCvs: Cv[] = [];
  fileName!: string;
  uploadProgress!: number | null;
  uploadSub!: Subscription | null;

  constructor(
    private readonly cvService: CvService,
    private readonly router: Router,
    private readonly shareCvData: ShareCvDataService,
    private readonly uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.cvService.getCvAll().subscribe((res: Cv[]) => (this.allCvs = res));
  }

  addOrEditCv(data: Cv | null): void {
    this.shareCvData.setData(data);
    this.router.navigateByUrl('/cv/add');
  }

  deleteCv(cvId: number, event: Event): void {
    event.stopPropagation();
    this.cvService
      .deleteCv(cvId)
      .pipe(switchMap(() => this.cvService.getCvAll()))
      .subscribe((res: Cv[]) => (this.allCvs = res));
  }

  displayCvDetails(row: Cv): void {
    this.router.navigateByUrl('cv/' + row.id);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData: FormData = new FormData();
      formData.append('file', file);

      const upload$ = this.uploadService.upload(formData).pipe(
        finalize(() => this.reset()),
        catchError((error: HttpErrorResponse) => {
          this.fileName = 'upload failed.';
          this.reset();
          return of(error);
        })
      );

      this.uploadSub = upload$.subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round((event.loaded * 100) / event.total);
        }
      });
    }
  }

  cancelUpload(): void {
    this.uploadSub ? this.uploadSub.unsubscribe() : null;
    this.reset();
  }

  private reset(): void {
    this.uploadProgress = null;
    this.uploadSub = null;
  }
}
