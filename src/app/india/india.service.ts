import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryIndiaService {
  constructor(private http: HttpClient) {}

  getIpLocation(): Observable<any> {
    return this.http.get(
      'https://api.ipgeolocation.io/ipgeo?apiKey=3cc6a06ee4a64e5194623184209bfeda',
      {
        withCredentials: true
      }
    );
  }

  /** Get detailed country data **/
  callCountryIndiaData(): Observable<any> {
    return this.http.get('https://api.rootnet.in/covid19-in/stats/latest', {});
  }

  callStateDistrictWiseData(): Observable<any> {
    return this.http.get(
      'https://data.covid19india.org/state_district_wise.json',
      {}
    );
  }

  /** Get important contact info state wise **/
  getImportantContactInfo(): Observable<any> {
    return this.http.get('https://api.rootnet.in/covid19-in/contacts', {});
  }

  /** Get total testing info **/
  getTotalTestingInfo(): Observable<any> {
    return this.http.get(
      'https://api.rootnet.in/covid19-in/stats/testing/latest',
      {}
    );
  }

  /** Get total testing info **/
  getTotalHospAndBedInfo(): Observable<any> {
    return this.http.get(
      'https://api.rootnet.in/covid19-in/hospitals/beds',
      {}
    );
  }
}
