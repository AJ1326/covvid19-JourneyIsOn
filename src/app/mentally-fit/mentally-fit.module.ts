import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { MentallyFitRoutingModule } from './mentally-fit-routing.module';
import { MentallyFitComponent } from './mentally-fit.component';
import { ModalModule } from '@app/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    MentallyFitRoutingModule,
    ModalModule
  ],
  declarations: [MentallyFitComponent]
})
export class MentallyFitModule {}
