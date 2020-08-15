import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { HomeDashboardRoutingModule } from './home-dashboard-routing.module';
import { HomeDashboardComponent } from './home-dashboard.component';
import { ModalModule } from '@app/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HomeDashboardRoutingModule,
    ModalModule
  ],
  declarations: [HomeDashboardComponent]
})
export class HomeDashboardModule {}
