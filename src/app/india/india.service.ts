import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryIndiaService {
  constructor(private http: HttpClient) {}

  /** Get detailed country data **/
  callCountryIndiaData(): Observable<any> {
    return this.http.get('https://api.rootnet.in/covid19-in/stats/latest', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    });
  }

  /** Get important contact info state wise **/
  getImportantContactInfo(): Observable<any> {
    return this.http.get('https://api.rootnet.in/covid19-in/contacts', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    });
  }

  /** Get total testing info **/
  getTotalTestingInfo(): Observable<any> {
    return this.http.get(
      'https://api.rootnet.in/covid19-in/stats/testing/latest',
      {
        withCredentials: true
      }
    );
  }

  /** Get total testing info **/
  getTotalHospAndBedInfo(): Observable<any> {
    return this.http.get('https://api.rootnet.in/covid19-in/hospitals/beds', {
      withCredentials: true
    });
  }
}
