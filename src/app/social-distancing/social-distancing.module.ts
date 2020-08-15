import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SocialDistancingRoutingModule } from './social-distancing-routing.module';
import { SocialDistancingComponent } from './social-distancing.component';
import { ModalModule } from '@app/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SocialDistancingRoutingModule,
    ModalModule
  ],
  declarations: [SocialDistancingComponent]
})
export class SocialDistancingModule {}
