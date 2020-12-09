import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HomeService } from './home.service';
import { SelectItem, SelectItemGroup } from 'primeng';
import '../../../node_modules/covid19-api/src/api/PluginManager.js';
import { ModalService } from '@app/modal/modal.service';
import { Router } from '@angular/router';

interface City {
  name: string;
  code: string;
}

interface Country {
  Country: string;
  Slug: string;
  ISO2: string;
}

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;
  cities: City[];
  selectedCountryData: any[];
  countries: Country[];
  error: any;
  summary: any[];
  cars: SelectItem[];
  selectedCountry = 'World';
  countryDetails: any[];
  globalDetails: any[];
  private PluginManager: any;

  constructor(
    private homeService: HomeService,
    private modalService: ModalService,
    private router: Router
  ) {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit() {
    this.getWorldData();
  }

  public getCountryViaIp() {
    this.homeService
      .getIpLocation()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          if (data.country_code2 === 'IN') {
            const payload = {
              country: data.country_name,
              district: data.district,
              state: data.state_prov,
              data: true
            };
            localStorage.setItem('IndiaData', JSON.stringify(payload));
          } else {
            const payload = {
              data: false
            };
            localStorage.setItem('IndiaData', JSON.stringify(payload));
          }
          this.selectCountryModal(data.country_code2);
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  public getWorldData() {
    this.isLoading = true;
    this.homeService
      .getSummary()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any = []) => {
          this.summary = data;
          this.globalDetails = data.Global;
          this.globalDetails['label'] = 'World';
          this.globalDetails['value'] = 'World';
          this.globalDetails['Slug'] = 'World';
          const dataCountry = data.Countries;
          function renameKey(obj: any, old_key: any, new_key: any) {
            // check if old key = new key
            if (old_key !== new_key) {
              Object.defineProperty(
                obj,
                new_key, // modify old key
                // fetch description from object
                Object.getOwnPropertyDescriptor(obj, old_key)
              );
              delete obj[old_key]; // delete old key
            }
          }
          if (this.summary['Global']['TotalConfirmed'] === 0) {
            if (confirm(this.summary['Message'])) {
              location.reload();
            } else {
              this.getWorldData();
            }
          } else {
            dataCountry.forEach((obj: any) =>
              renameKey(obj, 'Country', 'label')
            );
            dataCountry.forEach((obj: any) =>
              renameKey(obj, 'CountryCode', 'value')
            );
            dataCountry.unshift(this.globalDetails);
            this.countryDetails = dataCountry;
            this.getCountryViaIp();
          }
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
          if (this.error.status === 429) {
            if (
              confirm(
                'Sometimes the request rate is too high and api fails, Please click "OK" to reload.'
              )
            ) {
              location.reload();
            } else {
              this.getWorldData();
            }
          }
        }
      );
  }

  public selectCountryModal(country_selected: any) {
    this.selectedCountry = country_selected;
    this.getSelectedCountryData(this.selectedCountry);
  }

  public getSelectedCountryData(selected_country_iso: any) {
    this.selectedCountryData = this.countryDetails.find(obj => {
      return obj.value === selected_country_iso;
    });
  }

  showDetailCountryData() {
    this.openModal('country-modal-2');
  }

  showNews() {
    localStorage.setItem(
      'selectedCntry',
      JSON.stringify(
        this.selectedCountryData ? this.selectedCountryData : 'World'
      )
    );
    this.router.navigate(['news', 'covid']);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  public numberWithCommas(x: any) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  public chartData(globalData: any): void {
    const ivalue: any = [];
    const name: any = [];
    const showImpactedCountries = globalData.map((data: any) => ({
      Country: data.label,
      Confirmed: data.TotalConfirmed,
      Deaths: data.TotalDeaths,
      Recovered: data.TotalRecovered
    }));
    google.charts.load('current', {
      packages: ['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      mapsApiKey: 'AIzaSyC-k8u10v1qhT9QcVkSxn3AoDjM1kRGvc0'
    });
    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawMarkersMap() {
      var data = google.visualization.arrayToDataTable([
        ['City', 'Population', 'Area'],
        ['Rome', 2761477, 1285.31],
        ['Milan', 1324110, 181.76],
        ['Naples', 959574, 117.27],
        ['Turin', 907563, 130.17],
        ['Palermo', 655875, 158.9],
        ['Genoa', 607906, 243.6],
        ['Bologna', 380181, 140.7],
        ['Florence', 371282, 102.41],
        ['Fiumicino', 67370, 213.44],
        ['Anzio', 52192, 43.43],
        ['Ciampino', 38262, 11]
      ]);

      var options = {
        region: 'IT',
        displayMode: 'markers',
        colorAxis: { colors: ['green', 'blue'] }
      };

      var chart = new google.visualization.GeoChart(
        document.getElementById('chart_div')
      );
      chart.draw(data, options);
    }

    function drawRegionsMap() {
      const countryMapData = showImpactedCountries.map((obj: any) =>
        Object.values(obj)
      );
      const fieldCountryDetails = [
        'Country',
        'Confirmed',
        'Deaths',
        'Recovered'
      ];
      const newArray = [fieldCountryDetails].concat(countryMapData);
      const data = google.visualization.arrayToDataTable(newArray);

      const options = {
        region: 'canada'
      };

      const chart = new google.visualization.GeoChart(
        document.getElementById('regions_div')
      );

      // tslint:disable-next-line:only-arrow-functions
      google.visualization.events.addListener(chart, 'select', function() {
        const selectedItem = chart.getSelection()[0];
        // console.log('selectedItem', selectedItem);

        if (selectedItem) {
          const country = data.getValue(selectedItem.row, 0);
          // console.log('selectedItem country', country);
        }
      });

      chart.draw(data, options);
    }
  }
}
