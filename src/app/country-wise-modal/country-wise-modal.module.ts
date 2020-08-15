import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CountryWiseModalRoutingModule } from './country-wise-modal-routing.module';
import { CountryWiseModalComponent } from './country-wise-modal.component';
import {
  ChartModule,
  DropdownModule,
  MultiSelectModule,
  ProgressBarModule,
  TableModule
} from 'primeng';
import { MatListModule } from '@angular/material';
import { ModalModule } from '@app/modal/modal.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    TranslateModule,
    CountryWiseModalRoutingModule,
    DropdownModule,
    MatListModule,
    CalendarModule,
    ModalModule,
    TableModule,
    NgbModule,
    MultiSelectModule,
    ProgressBarModule,
    ChartModule,
    ChartsModule
  ],
  exports: [CountryWiseModalComponent],
  declarations: [CountryWiseModalComponent]
})
export class CountryWiseModalModule {}
