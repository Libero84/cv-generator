import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cv } from '../models/cv';

@Injectable({
  providedIn: 'root',
})
export class ShareCvDataService {
  cvData$: Observable<Cv | null>;
  cvDataSubject$: Subject<Cv | null> = new BehaviorSubject<Cv | null>(null);

  constructor() {
    this.cvData$ = this.cvDataSubject$.asObservable();
  }

  setData(data: Cv | null): void {
    this.cvDataSubject$.next(data);
  }
}
