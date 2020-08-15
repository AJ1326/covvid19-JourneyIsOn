import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryTableService {
  constructor(private http: HttpClient) {}

  /** Get detailed country data **/
  callCountryDetails(iso_code: any): Observable<any> {
    return this.http.get(
      'https://api.covid19api.com/total/dayone/country/' + iso_code,
      {
        withCredentials: true
      }
    );
  }

  /** Get country population **/
  callCountryPopulation(): Observable<any> {
    return this.http.get(
      'https://world-population.p.rapidapi.com/allcountriesname',
      {
        headers: {
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
          'x-rapidapi-key': '774b83e2a6mshd9d94348f58aee5p1a3f1djsnbf7f148811de'
        },
        withCredentials: true
      }
    );
  }

  /** Get country wise population **/
  callCountryWisePopulation(country_name: any): Observable<any> {
    return this.http.get(
      'https://world-population.p.rapidapi.com/population?country_name=' +
        country_name,
      {
        headers: {
          'x-rapidapi-host': 'world-population.p.rapidapi.com',
          'x-rapidapi-key': '774b83e2a6mshd9d94348f58aee5p1a3f1djsnbf7f148811de'
        },
        withCredentials: true
      }
    );
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
