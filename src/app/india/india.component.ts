import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { ModalService } from '@app/modal/modal.service';
import { CountryIndiaService } from '@app/india/india.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})
export class IndiaComponent implements OnInit {
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
  totalTestingConducted: string;
  hospAndBedData: any[];

  constructor(
    private modalService: ModalService,
    private countryIndiaService: CountryIndiaService
  ) {}

  ngOnInit() {
    this.date = new Date();
    console.log('this.date', this.date);
    const SELECTORS = {
      section: '[data-section]',
      scrollTo: '[data-scroll-to]',
      scrollDir: '[data-scroll-dir]'
    };
    this.getCountryIndiaData();
    this.getImportantContactInfo();
    this.getTotalTestingInfo();
    this.getTotalHospAndBedInfo();
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
          this.countryData = data;
          console.log('country data', data);
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
          this.contactInfoData = data;
          console.log('contactInfoData data', this.contactInfoData);
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
          this.totalTestingConducted = data;
          console.log('totalTestingConducted data', this.totalTestingConducted);
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
          this.hospAndBedData = data;
          console.log('hospAndBedData data', this.hospAndBedData);
        },
        (error: any) => {
          // log.debug(`Select program error: ${error}`);
          this.error = error;
        }
      );
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
