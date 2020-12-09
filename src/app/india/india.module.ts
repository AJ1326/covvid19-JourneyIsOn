import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { IndiaRoutingModule } from './india-routing.module';
import { IndiaComponent } from './india.component';
import { ModalModule } from '@app/modal/modal.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IndiaRoutingModule,
    ModalModule,
    FormsModule
  ],
  declarations: [IndiaComponent]
})
export class IndiaModule {}
