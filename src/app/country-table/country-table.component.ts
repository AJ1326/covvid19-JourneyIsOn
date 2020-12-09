import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Table } from 'primeng';
import { ModalService } from '@app/modal/modal.service';
import { CountryTableService } from '@app/country-table/country-table.service';

@Component({
  selector: 'app-country-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.scss']
})
export class CountryTableComponent implements OnInit {
  @Input() countryDetails: any;
  @Input() globalDetails: any;

  country: any[];
  globalData: any[];
  selectedCountryDetails: any[];
  selectedCountry: any[];
  error: string;
  isLoading = false;
  // closePredictiveModal = false;

  @ViewChild('dt', { static: false }) table: Table;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.country = this.countryDetails;
    this.globalData = this.globalDetails;
  }

  // TODO: In case you want to add some extra functionality to the table.
  onActivityChange(event: any) {
    const value = event.target.value;
    if (value && value.trim().length) {
      // tslint:disable-next-line:radix
      const activity = parseInt(value);

      if (!isNaN(activity)) {
        this.table.filter(activity, 'activity', 'gte');
      }
    }
  }

  // TODO: In case you want to add filtering using date.
  onDateSelect(value: any) {
    this.table.filter(this.formatDate(value), 'date', 'equals');
  }

  formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
  }

  public showBarValue(country_data: any) {
    const data = (
      (country_data.TotalConfirmed / this.globalData['TotalConfirmed']) *
      100
    ).toFixed(2);
    return data;
  }

  showDetailCountryData(country_data: any) {
    this.selectedCountryDetails = country_data;
    this.openModal('country-modal');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
    // this.closePredictiveModal = false;
  }
}
