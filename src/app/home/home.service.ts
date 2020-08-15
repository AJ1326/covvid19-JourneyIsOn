import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  /** Data call for country list **/
  getCountries(): Observable<any> {
    return this.http.get('https://api.covid19api.com/countries', {
      withCredentials: true
    });
  }

  /** Total summary of the world **/
  getSummary(): Observable<any> {
    return this.http.get('https://api.covid19api.com/summary', {
      withCredentials: true
    });
  }

  /** Data call for program list **/
  organisationalDrillDownData(
    org_uuid: string,
    prog_uuid: string,
    frequency: string,
    slug: string
  ): Observable<any> {
    return this.http.get(
      '/api/organizations/' +
        org_uuid +
        '/dashboard/events/?program=' +
        prog_uuid +
        '&frequency=' +
        frequency +
        '&slug=' +
        slug,
      {
        withCredentials: true
      }
    );
  }

  /** Data call for program list **/
  organisationalDrillDownHistoryData(
    org_uuid: string,
    event_uuid: string
  ): Observable<any> {
    return this.http.get(
      '/api/organizations/' + org_uuid + '/events/' + event_uuid + '/history/',
      {
        withCredentials: true
      }
    );
  }

  /** Data call for dashboard **/
  organisationalDashboardData(
    org_uuid: string,
    prog_uuid: string
  ): Observable<any> {
    return this.http.get(
      '/api/organizations/' + org_uuid + '/dashboard/?program=' + prog_uuid,
      {
        withCredentials: true
      }
    );
  }
}
