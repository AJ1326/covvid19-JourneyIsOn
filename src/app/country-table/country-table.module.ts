import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { CountryTableRoutingModule } from './country-table-routing.module';
import { CountryTableService } from './country-table.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { CountryTableComponent } from '@app/country-table/country-table.component';
import { ModalModule } from '@app/modal/modal.module';
import {
  ChartModule,
  MultiSelectModule,
  ProgressBarModule,
  TableModule
} from 'primeng'; // See material.angular.io/components/list/api
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { CountryWiseModalModule } from '@app/country-wise-modal/country-wise-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    CountryTableRoutingModule,
    DropdownModule,
    MatListModule,
    ModalModule,
    TableModule,
    NgbModule,
    MultiSelectModule,
    ProgressBarModule,
    ChartModule,
    ChartsModule,
    CountryWiseModalModule
  ],
  exports: [CountryTableComponent],
  declarations: [CountryTableComponent]
})
export class CountryTableModule {}
