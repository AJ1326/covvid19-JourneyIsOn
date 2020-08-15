import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SymptomsRoutingModule } from './symptoms-routing.module';
import { SymptomsComponent } from './symptoms.component';

@NgModule({
  imports: [CommonModule, TranslateModule, SymptomsRoutingModule],
  declarations: [SymptomsComponent]
})
export class SymptomsModule {}
