import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TransRateRoutingModule } from './trans-rate-routing.module';
import { TransRateComponent } from './trans-rate.component';

@NgModule({
  imports: [CommonModule, TranslateModule, TransRateRoutingModule],
  declarations: [TransRateComponent]
})
export class TransRateModule {}
