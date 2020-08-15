import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsDetailService {
  apiKey = '691885a2fb8f43b2bc520d944f892178';

  constructor(private http: HttpClient) {}

  /** Total summary of the world **/
  getSummary(): Observable<any> {
    return this.http.get('https://api.covid19api.com/summary', {
      withCredentials: true
    });
  }
}
