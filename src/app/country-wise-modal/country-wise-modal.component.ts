import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { CountryTableService } from '@app/country-table/country-table.service';

@Component({
  selector: 'app-country-wise-modal',
  templateUrl: './country-wise-modal.component.html',
  styleUrls: ['./country-wise-modal.component.scss']
})
export class CountryWiseModalComponent implements OnInit, OnChanges {
  version: string | null = environment.version;
  country: any[];
  selectedCountryData: any[];
  confirmedCasesOverTime: any[];
  recoveredCasesOverTime: any[];
  deathCasesOverTime: any[];
  dateOverTime: any[];
  globalData: any[];
  countryPopulation: any;
  allcountryPopulation: any;
  statuses: any[];
  countryData: any[];
  error: string;
  isLoading = false;
  chartLineOptions: any;
  chartLineData: any;
  chartLineLabels: any;
  confirmedGrowthRate: any;
  recoveredGrowthRate: any;
  deathGrowthRate: any;
  confirmedDailyGrowthRate: any;
  recoveredDailyGrowthRate: any;
  deathDailyGrowthRate: any;
  mortalityRate: any;
  dailyConfirmedDoublingRate: any[];
  dailyDeathsDoublingRate: any[];
  dailyRecoveredDoublingRate: any[];
  dailyMoratalityRate: any[];
  mortalityGrowthRate: any;
  confirmDoublingGrowthRate: any;
  recoverDoublingGrowthRate: any;
  deathDoublingGrowthRate: any;
  doublingConfirmRateOverAll: any;
  doublingDeathRateOverAll: any;
  doublingRecoveredRateOverAll: any;
  dailyConfirmedGrowthRate: any[];
  dailyRecoveredGrowthRate: any[];
  dailyDeathsGrowthRate: any[];
  averageConfirmedGrowthRate: any;
  averageRecoveredGrowthRate: any;
  averageDeathsGrowthRate: any;
  futureDate = new Date();
  showDateError = false;
  infectionRate: any;

  @Input() selectedCountryDetails: any;
  @Input() globalDetails: any;
  @Input() predictiveModal = true;

  constructor(private countryTableService: CountryTableService) {}

  ngOnChanges(changes: SimpleChanges) {
    // this.predictiveModal = changes.predictiveModal.currentValue;
    this.calculateCountryWiseData(changes.selectedCountryDetails.currentValue);
    // console.log('this.predictiveModal change', this.predictiveModal);
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values
  }

  ngOnInit() {
    // console.log('this.predictiveModal', this.predictiveModal);
  }

  calculateCountryWiseData(selectedCntry: any) {
    this.selectedCountryData = selectedCntry;
    this.globalData = this.globalDetails;
    this.callCountryWiseData(this.selectedCountryData['value']);
    this.callCountryPopulationData(this.selectedCountryData['Slug']);
  }

  callCountryWiseData(slug: any) {
    this.countryTableService
      .callCountryDetails(slug)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.countryData = data;
          this.confirmedCasesOverTime = this.countryData.map(
            (confirmed: any) => confirmed.Confirmed
          );
          this.recoveredCasesOverTime = this.countryData.map(
            (confirmed: any) => confirmed.Recovered
          );
          this.deathCasesOverTime = this.countryData.map(
            (confirmed: any) => confirmed.Deaths
          );
          this.dateOverTime = this.countryData.map((confirmed: any) => {
            // this.formatDate(confirmed.Date);
            const date = new Date(confirmed.Date);
            const year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dt = date.getDate();

            if (dt < 10) {
              dt = Number('0' + dt);
            }
            if (month < 10) {
              month = Number('0' + month);
            }
            return year + '-' + month + '-' + dt;
          });
          this.createLineChart(
            this.confirmedCasesOverTime,
            this.recoveredCasesOverTime,
            this.deathCasesOverTime,
            this.dateOverTime
          );
          this.statisticsCountryWise(
            this.confirmedCasesOverTime,
            this.recoveredCasesOverTime,
            this.deathCasesOverTime
          );
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  callCountryPopulationData(selectedCntry: any) {
    console.log('selectedCntry search all country population', selectedCntry);
    const k = selectedCntry.replace(/-/g, ' ');
    const selected_cntry = k.replace(/\b[a-z]/g, (x: any) => x.toUpperCase());
    console.log('selected country', selected_cntry);
    this.countryTableService
      .callCountryPopulation()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.allcountryPopulation = data.body.countries;
          const country = this.allcountryPopulation.find((a: any) =>
            a.includes(selected_cntry)
          );
          console.log('country selected ffrom list of cpuntries', country);
          this.callCountryWisePopulationData(country);
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  callCountryWisePopulationData(slug: any) {
    console.log('slug for which country needed', slug);
    this.countryTableService
      .callCountryWisePopulation(slug)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.countryPopulation = data.body.population;
          console.log('this.countryPopulation', this.countryPopulation);
          this.calculateInfectionRate(this.countryPopulation);
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  public createLineChart(
    confirmedCases: any,
    recoveredCases: any,
    deathCases: any,
    dateLabel: any
  ) {
    //  Chart data
    this.chartLineOptions = {
      responsive: true
    };
    this.chartLineData = [
      { data: confirmedCases, label: 'confirmed cases' },
      { data: recoveredCases, label: 'recovered cases' },
      { data: deathCases, label: 'death cases' }
    ];
    this.chartLineLabels = dateLabel;
  }

  public statisticsCountryWise(
    confirmedCases: any,
    recoveredCases: any,
    deathCases: any
  ) {
    this.calculateMortalityRate();
    this.calculateMortalityRateOverTime();
    this.calculateGrowthRateOverTime(
      confirmedCases,
      recoveredCases,
      deathCases
    );
    this.calculateDailyGrowthRateOverTime(
      confirmedCases,
      recoveredCases,
      deathCases
    );
    this.calculateDoublingRateOverTime(
      confirmedCases,
      recoveredCases,
      deathCases
    );
    this.calculateDoublingRateOverAll();
  }

  // InfectionRate overall
  public calculateMortalityRate() {
    // Fatality rate over period of time.
    this.mortalityRate =
      this.selectedCountryData['TotalDeaths'] /
      this.selectedCountryData['TotalConfirmed'];
  }

  // MortalityRate overall
  public calculateInfectionRate(population: any) {
    // Fatality rate over period of time.
    console.log(
      'total confirmed',
      this.selectedCountryData['TotalConfirmed'],
      'Population',
      population
    );
    this.infectionRate =
      this.selectedCountryData['TotalConfirmed'] / population;
    console.log('this.infectionRate', this.infectionRate);
    this.totalInfetedByToday(this.infectionRate);
  }

  // Total estimeted cases by today
  public totalInfetedByToday(infectionRate: any) {
    const days = this.calculateDaysBetween2Dates(
      this.countryData[0]['Date'],
      Date.now()
    );
    console.log('days till now', days);
    console.log('infectionRate', infectionRate);
    const N = Math.exp(infectionRate.days);
    console.log('current exp cases', N);
  }

  // MortalityRate daily / MortalityGrowthRate over time
  public calculateMortalityRateOverTime() {
    this.dailyMoratalityRate = this.countryData.map(
      (data: any) => data['Deaths'] / data['Confirmed']
    );
    this.mortalityGrowthRate = this.calculateGrowthRateOfArray(
      this.dailyMoratalityRate
    );
  }

  // To Calculate GrowthRate for an array.
  public calculateGrowthRateOfArray(data: any) {
    return Math.pow(data[data.length - 1] / data[0], 1 / data.length) - 1;
    // }
  }

  // To Calculate GrowthRate for an array.
  public calculateAverageRateOfArray(data: any) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += parseInt(data[i], 10);
    }
    return sum / data.length;
  }

  // GrowthRate over time after 100 cases(overall).
  public calculateGrowthRateOverTime(
    confirmedCases: any,
    recoveredCases: any,
    deathCases: any
  ) {
    this.confirmedGrowthRate =
      Math.pow(
        this.selectedCountryData['TotalConfirmed'] / 100,
        1 / confirmedCases.length
      ) - 1;
    this.recoveredGrowthRate =
      Math.pow(
        this.selectedCountryData['TotalRecovered'] / 100,
        1 / recoveredCases.length
      ) - 1;
    this.deathGrowthRate =
      Math.pow(
        this.selectedCountryData['TotalDeaths'] / 100,
        1 / deathCases.length
      ) - 1;
  }

  public doublingRateCalculator(today: any, before: any, days: any) {
    return days / (Math.log2(today) - Math.log2(before));
  }

  // DoublingRate over time after 100 cases.(Daily and GrowthRate of doubling rate)
  public calculateDoublingRateOverTime(
    confirmedCases: any,
    recoveredCases: any,
    deathCases: any
  ) {
    this.dailyConfirmedDoublingRate = this.countryData
      .map((data: any, index) => {
        if (data.Confirmed >= 100) {
          const days = this.calculateDaysBetween2Dates(
            data.Date,
            this.countryData[index - 1].Date
          );
          return this.doublingRateCalculator(
            data.Confirmed,
            this.countryData[index - 1].Confirmed,
            days
          );
        } else {
          return 0;
        }
      })
      .filter(val => val > 0);

    this.dailyRecoveredDoublingRate = this.countryData
      .map((data: any, index) => {
        if (data.Confirmed >= 100) {
          const days = this.calculateDaysBetween2Dates(
            data.Date,
            this.countryData[index - 1].Date
          );
          return this.doublingRateCalculator(
            data.Recovered,
            this.countryData[index - 1].Recovered,
            days
          );
        } else {
          return 0;
        }
      })
      .filter(val => val > 0);

    this.dailyDeathsDoublingRate = this.countryData
      .map((data: any, index) => {
        if (data.Confirmed >= 100) {
          const days = this.calculateDaysBetween2Dates(
            data.Date,
            this.countryData[index - 1].Date
          );
          return this.doublingRateCalculator(
            data.Deaths,
            this.countryData[index - 1].Deaths,
            days
          );
        } else {
          return 0;
        }
      })
      .filter(val => val > 0);

    this.confirmDoublingGrowthRate = this.calculateGrowthRateOfArray(
      this.dailyConfirmedDoublingRate
    );
    this.recoverDoublingGrowthRate = this.calculateGrowthRateOfArray(
      this.dailyDeathsDoublingRate
    );
    this.deathDoublingGrowthRate = this.calculateGrowthRateOfArray(
      this.dailyRecoveredDoublingRate
    );
  }

  // DoublingRate over time (overall)
  public calculateDoublingRateOverAll() {
    const days = this.calculateDaysBetween2Dates(
      this.selectedCountryData['Date'],
      this.countryData[0].Date
    );
    this.doublingConfirmRateOverAll =
      days /
      (Math.log2(this.selectedCountryData['TotalConfirmed']) - Math.log2(1));
    this.doublingDeathRateOverAll =
      days /
      (Math.log2(this.selectedCountryData['TotalDeaths']) - Math.log2(1));
    this.doublingRecoveredRateOverAll =
      days /
      (Math.log2(this.selectedCountryData['TotalRecovered']) - Math.log2(1));
  }

  // Calculate days between 2 days.
  public calculateDaysBetween2Dates(firstDate: any, secondDate: any) {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    return Difference_In_Time / (1000 * 3600 * 24);
  }

  public dailyGrowthCalculator(today: any, before: any) {
    return (today - before) / before;
  }

  public calculateDailyGrowthRateOverTime(
    confirmedCases: any,
    recoveredCases: any,
    deathCases: any
  ) {
    this.dailyConfirmedGrowthRate = this.countryData
      .map((data: any, index) => {
        if (data.Confirmed >= 1) {
          const val =
            data.Confirmed === 1
              ? '0'
              : this.countryData[index - 1]['Confirmed'];
          if (val === '0') {
            return 1;
          } else {
            return this.dailyGrowthCalculator(data.Confirmed, val);
          }
        } else {
          return 0;
        }
      })
      .filter(val => val > 0);

    this.dailyRecoveredGrowthRate = this.countryData
      .map((data: any, index) => {
        if (data.Recovered >= 1) {
          const val =
            data.Recovered === 1
              ? '0'
              : this.countryData[index - 1]['Recovered'];
          if (val === '0') {
            return 1;
          } else {
            return this.dailyGrowthCalculator(data.Recovered, val);
          }
        } else {
          return 0;
        }
      })
      .filter(val => val > 0);

    this.dailyDeathsGrowthRate = this.countryData
      .map((data: any, index) => {
        if (data.Deaths >= 1) {
          const val =
            data.Deaths === 1 ? '0' : this.countryData[index - 1]['Deaths'];
          if (val === '0') {
            return 1;
          } else {
            return this.dailyGrowthCalculator(data.Deaths, val);
          }
        } else {
          return 0;
        }
      })
      .filter(val => val > 0);

    this.calculateAverageGrowthRate(
      this.dailyConfirmedGrowthRate,
      this.dailyRecoveredGrowthRate,
      this.dailyDeathsGrowthRate
    );
  }

  public calculateAverageGrowthRate(
    dailyConfirmedGrowthRate: any,
    dailyRecoveredGrowthRate: any,
    dailyDeathsGrowthRate: any
  ) {
    this.averageConfirmedGrowthRate = this.calculateAverageRateOfArray(
      dailyConfirmedGrowthRate
    );
    this.averageRecoveredGrowthRate = this.calculateAverageRateOfArray(
      dailyRecoveredGrowthRate
    );
    this.averageDeathsGrowthRate = this.calculateAverageRateOfArray(
      dailyDeathsGrowthRate
    );
    console.log(
      'this.cumilativeConfirmedGrowthRate',
      this.averageConfirmedGrowthRate
    );
  }

  public calculateDailyGrowthRate(
    confirmedCases: any,
    recoveredCases: any,
    deathCases: any
  ) {
    console.log('confirmedCases', confirmedCases);
    console.log(
      'confirmedCases[confirmedCases.length - 1]',
      confirmedCases[confirmedCases.length - 2]
    );
    this.confirmedDailyGrowthRate =
      (this.selectedCountryData['NewConfirmed'] /
        confirmedCases[confirmedCases.length - 2]) *
      100;
    const confirmedDailyGrowthRate1 =
      this.selectedCountryData['NewConfirmed'] /
      confirmedCases[confirmedCases.length - 2];
    console.log(
      'Expected cases tomm',
      confirmedDailyGrowthRate1 * confirmedCases[confirmedCases.length - 1] +
        confirmedCases[confirmedCases.length - 1]
    );
    this.recoveredDailyGrowthRate =
      (this.selectedCountryData['NewRecovered'] /
        recoveredCases[recoveredCases.length - 2]) *
      100;
    this.deathDailyGrowthRate =
      (this.selectedCountryData['NewDeaths'] /
        deathCases[deathCases.length - 2]) *
      100;
  }

  public openPredictiveAnalysis() {
    this.predictiveModal = !this.predictiveModal;
  }

  calculateCurrentDateCases(
    days: any,
    cumilativeGR: any,
    newCases: any,
    totalCases: any
  ) {
    return (newCases + totalCases) * Math.pow(1 + cumilativeGR, days);
  }

  public onFutureDateChange(event: any) {
    this.futureDate = event;
    const currentDate = new Date();

    if (this.futureDate.getTime() <= currentDate.getTime()) {
      this.showDateError = true;
    } else {
      this.showDateError = false;
      const days = this.calculateDaysBetween2Dates(
        currentDate,
        this.futureDate
      );

      const confirmedGrowthRateAtThatTime = this.calculateCurrentDateCases(
        days,
        this.confirmedGrowthRate,
        this.selectedCountryData['NewConfirmed'],
        this.selectedCountryData['TotalConfirmed']
      );

      const recoveredGrowthRateAtThatTime = this.calculateCurrentDateCases(
        days,
        this.recoveredGrowthRate,
        this.selectedCountryData['NewRecovered'],
        this.selectedCountryData['TotalRecovered']
      );

      const deathsGrowthRateAtThatTime = this.calculateCurrentDateCases(
        days,
        this.deathGrowthRate,
        this.selectedCountryData['NewDeaths'],
        this.selectedCountryData['TotalDeaths']
      );
    }
  }

  showNews() {
    console.log('news');
  }

  onChartClick(event: any) {
    console.log(event);
  }
}
