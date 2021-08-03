import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackendCv, BackendCvAll, Cv } from '../../../models/cv';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CvService {
  private URL: string = environment.url + '/cv/';

  constructor(private readonly http: HttpClient) {}

  getCvAll(): Observable<Cv[]> {
    return this.http.get<BackendCvAll>(this.URL).pipe(map((res: BackendCvAll) => res.data));
  }

  getCv(cvId: number): Observable<Cv> {
    return this.http.get<BackendCv>(this.URL + cvId).pipe(map((res: BackendCv) => res.data));
  }

  downloadCv(cvId: number): Observable<any> {
    return this.http.get<any>(this.URL + 'download/' + cvId);
  }

  createCv(body: Cv): Observable<Cv> {
    return this.http.post<Cv>(this.URL, body);
  }

  updateCv(cvId: number, body: Cv): Observable<Cv> {
    return this.http.put<Cv>(this.URL + cvId, body);
  }

  deleteCv(cvId: number): Observable<any> {
    return this.http.delete<any>(this.URL + cvId);
  }
}
