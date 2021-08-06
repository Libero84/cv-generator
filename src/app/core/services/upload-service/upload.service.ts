import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private URL: string = environment + '/import';

  constructor(private readonly http: HttpClient) {}

  upload(formData: FormData): Observable<any> {
    return this.http.post<any>(this.URL, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
