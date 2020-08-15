import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { EconomyImpactRoutingModule } from './economy-impact-routing.module';
import { EconomyImpactComponent } from './economy-impact.component';

@NgModule({
  imports: [CommonModule, TranslateModule, EconomyImpactRoutingModule],
  declarations: [EconomyImpactComponent]
})
export class EconomyImpactModule {}
