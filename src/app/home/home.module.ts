import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { CountryTableModule } from '@app/country-table/country-table.module';
import { WorldMapModule } from '@app/world-map/world-map.module';
import { NewsCardModule } from '@app/news-card/news-card.module';
import { CountryWiseModalModule } from '@app/country-wise-modal/country-wise-modal.module';
import { ModalModule } from '@app/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    DropdownModule,
    MatListModule,
    CountryTableModule,
    WorldMapModule,
    NewsCardModule,
    CountryWiseModalModule,
    ModalModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule {}
