import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { PreventionRoutingModule } from './prevention-routing.module';
import { PreventionComponent } from './prevention.component';

@NgModule({
  imports: [CommonModule, TranslateModule, PreventionRoutingModule],
  declarations: [PreventionComponent]
})
export class PreventionModule {}
