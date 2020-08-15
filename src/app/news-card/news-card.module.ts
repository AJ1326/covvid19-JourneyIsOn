import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NewsCardRoutingModule } from './news-card-routing.module';
import { NewsCardComponent } from './news-card.component';

@NgModule({
  imports: [CommonModule, TranslateModule, NewsCardRoutingModule],
  exports: [NewsCardComponent],
  declarations: [NewsCardComponent]
})
export class NewsCardModule {}
