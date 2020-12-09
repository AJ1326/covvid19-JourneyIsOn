import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '@env/environment';
import { ModalService } from '@app/modal/modal.service';
import { CountryIndiaService } from '@app/india/india.service';
import { finalize } from 'rxjs/operators';
import { ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  filter,
  debounceTime,
  distinctUntilChanged,
  tap
} from 'rxjs/operators';
// import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit, AfterViewInit {
  version: string | null = environment.version;
  date: any;
  public covidVideo = false;
  public lifeProspective = false;
  public vaccine = false;
  public pandemicOver = false;
  public setID = '';
  error: string;
  isLoading = false;
  countryData: any[];
  contactInfoData: any[];
  stateWiseData: any[];
  stateDistrictWiseData: any[];
  totalTestingConducted: any;
  hospAndBedData: any[];
  finalArray: any[];
  stateAndDistrictArrayCp: any[];
  showData: any;
  searchFilter = false;
  stateAndDistrictArray: any[];
  stateSearch = '';
  // for search
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private modalService: ModalService,
    private countryIndiaService: CountryIndiaService
  ) // private cdr: ChangeDetectorRef
  {}

  sortSearchFunction(search: string, arr: any) {
    let finalPayload;
    let sortedArraySearch: any = [];
    let abc = _.mapKeys(arr, function(key, value) {
      let arr: any = [];
      const stateValue = value;
      let xyz = _.findKey(key, function(o) {
        const stateValue = value;
        if (typeof o === 'object') {
          const data = Object.keys(o).map(v => v.toLowerCase());
          data.map(val => {
            if (val.includes(search)) {
              const x = Object.entries(o).reduce((a, [key, value]) => {
                a[key.toLowerCase()] = value;
                return a;
              }, {});
              const payload = {
                key: val,
                value: x[val]
              };
              return x[val];
              arr.push(payload);
            }
          });
        }
      });
      if (arr.length > 0) {
        finalPayload = {
          state: stateValue,
          result: arr
        };
        sortedArraySearch.push(finalPayload);
      }
    });
    // console.log('arr2', sortedArraySearch)
  }

  ngAfterViewInit() {
    // Detect change for color
    // this.cdr.detectChanges();
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap((event: KeyboardEvent) => {
          this.callSearchData(this.input.nativeElement.value);
        })
      )
      .subscribe((data: any) => {});
  }

  callSearchData(searchString: string) {
    this.stateSearch = searchString;
    if (searchString === '') {
      this.stateAndDistrictArray = this.stateAndDistrictArrayCp;
      this.searchFilter = false;
    } else {
      // console.log('searchString', searchString);
      this.stateAndDistrictArray = this.filterByValue(
        this.stateAndDistrictArrayCp,
        searchString
      );
      this.searchFilter = true;
    }
  }

  ngOnInit() {
    this.date = new Date();
    const SELECTORS = {
      section: '[data-section]',
      scrollTo: '[data-scroll-to]',
      scrollDir: '[data-scroll-dir]'
    };
    this.getAllData();
    const sectionsArray = Array.from(
      document.querySelectorAll(SELECTORS.section)
    );
    const scrollToElements = document.querySelectorAll(SELECTORS.scrollTo);
    const scrollDirElements = document.querySelectorAll(SELECTORS.scrollDir);

    let currentSectionIndex = 0;

    const getScrollTarget = (dir: any) => {
      if (dir === 'prev' && currentSectionIndex > 0) {
        currentSectionIndex--;
        return sectionsArray[currentSectionIndex];
      }
      if (dir === 'next' && currentSectionIndex < sectionsArray.length - 1) {
        currentSectionIndex++;
        return sectionsArray[currentSectionIndex];
      }
      return false;
    };

    scrollDirElements.forEach((el: any) => {
      el.addEventListener('click', () => {
        const direction = el.dataset.scrollDir;
        const target = getScrollTarget(direction);

        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    scrollToElements.forEach((el: any) => {
      el.addEventListener('click', (e: any) => {
        e.preventDefault();
        const targetId = el.getAttribute('href');
        const target = document.querySelector(targetId);

        if (target) {
          sectionsArray.forEach((section, index) => {
            if (section.id === targetId.replace('#', '')) {
              currentSectionIndex = index;
            }
          });
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  getAllData() {
    this.getCountryIndiaData();
    this.getTotalTestingInfo();
    this.callStateDistrictWiseData();
  }

  callStateDistrictWiseData() {
    this.countryIndiaService
      .callStateDistrictWiseData()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.stateDistrictWiseData = data;
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  getCountryIndiaData() {
    this.countryIndiaService
      .callCountryIndiaData()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.countryData = data.data;
          this.getImportantContactInfo();
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  getImportantContactInfo() {
    this.countryIndiaService
      .getImportantContactInfo()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.contactInfoData = data.data;
          this.getTotalHospAndBedInfo();
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  getTotalTestingInfo() {
    this.countryIndiaService
      .getTotalTestingInfo()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.totalTestingConducted = data.data;
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  getTotalHospAndBedInfo() {
    this.countryIndiaService
      .getTotalHospAndBedInfo()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          this.hospAndBedData = data.data;
          this.commonArrayFunction();
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  filterByValue(array: any, string: any) {
    return array.filter((o: any) =>
      Object.keys(o).some(
        k =>
          typeof o[k] === 'string' &&
          o[k].toLowerCase().includes(string.toLowerCase())
      )
    );
  }

  mergeArrayObjects = (arr1: any, arr2: any) =>
    arr1.map((itm: any) => ({
      ...arr2.find((item: any) => item['location'] === itm['location']),
      ...itm
    }));

  mergeArrayObjectsBasedOnInclude = (arr1: any, arr2: any) =>
    arr1.map((itm: any) => ({
      ...arr2.find((item: any) => itm['state'].includes(item['location'])),
      ...itm
    }));

  changeKeyOfArray(arrayObj: any, oldKey: any) {
    let newArray = arrayObj.map((o: any) => {
      return Object.assign(
        {
          location: o[oldKey].split(' ')[0],
          state: o[oldKey]
        },
        _.omit(o, oldKey)
      );
    });
    return newArray;
  }

  public getCountryViaIp() {
    this.countryIndiaService
      .getIpLocation()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          if (data.country_code2 === 'IN') {
            this.callSearchData(data.state_prov);
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
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
  }

  checkUsersState() {
    let stateData = JSON.parse(localStorage.getItem('IndiaData'));
    if (stateData) {
      if (stateData['data']) {
        this.callSearchData(stateData.state);
      } else {
        this.getCountryViaIp();
      }
    } else {
      this.getCountryViaIp();
    }
  }

  mergeStateAndDistrictData(dataArray: any) {
    let stateDistrictWiseArray: any[] = Object.keys(dataArray).map(
      (key: any) => {
        return {
          state: key,
          districts: dataArray[key]
        };
      }
    );
    this.stateAndDistrictArray = this.mergeArrayObjectsBasedOnInclude(
      stateDistrictWiseArray,
      this.finalArray
    );
    this.stateAndDistrictArrayCp = this.stateAndDistrictArray = this.stateAndDistrictArray.slice(
      1
    );
    this.checkUsersState();
    // console.log('mergeStateAndDistrictData', this.stateAndDistrictArray);
  }

  commonArrayFunction() {
    const hospAndBedData = this.changeKeyOfArray(
      this.hospAndBedData['regional'],
      'state'
    );
    const contactInfoData = this.changeKeyOfArray(
      this.contactInfoData['contacts']['regional'],
      'loc'
    );
    const countryData = this.changeKeyOfArray(
      this.countryData['regional'],
      'loc'
    );
    const mergeHospAndContact = this.mergeArrayObjects(
      hospAndBedData,
      contactInfoData
    );
    this.finalArray = this.mergeArrayObjects(mergeHospAndContact, countryData);
    this.mergeStateAndDistrictData(this.stateDistrictWiseData);
    this.showData = true;
  }

  checkDistrictData(data: any) {
    if (Object.keys(data).length > 1) {
      return true;
    } else {
      return false;
    }
  }

  videoDisplayType(id: string, status: boolean) {
    this.setID = id;
    switch (id) {
      case 'whatIsCovid':
        this.covidVideo = status;
        break;
      case 'lifeProspective':
        this.lifeProspective = status;
        break;
      case 'pandemicOver':
        this.pandemicOver = status;
        break;
      case 'vaccine':
        this.vaccine = status;
        break;
    }
  }

  openCovid19Video(id: string, status: boolean) {
    this.videoDisplayType(id, status);
    this.modalService.open(id);
  }

  closeCovid19Video(id: string, status: boolean) {
    this.modalService.close(id);
    this.videoDisplayType(id, status);
  }
}
