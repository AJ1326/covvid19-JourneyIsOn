import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { AgeSexRoutingModule } from './age-sex-routing.module';
import { AgeSexComponent } from './age-sex.component';

@NgModule({
  imports: [CommonModule, TranslateModule, AgeSexRoutingModule],
  declarations: [AgeSexComponent]
})
export class AgeSexModule {}
