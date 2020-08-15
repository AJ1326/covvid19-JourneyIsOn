import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NewsDetailRoutingModule } from './news-detail-routing.module';
import { NewsDetailComponent } from './news-detail.component';
import { DropdownModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    SharedModule,
    TranslateModule,
    NewsDetailRoutingModule,
    DropdownModule
  ],
  exports: [NewsDetailComponent],
  declarations: [NewsDetailComponent]
})
export class NewsDetailModule {}
