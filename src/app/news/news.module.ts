import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsCardModule } from '@app/news-card/news-card.module';

@NgModule({
  imports: [CommonModule, TranslateModule, NewsRoutingModule, NewsCardModule],
  exports: [NewsComponent],
  declarations: [NewsComponent]
})
export class NewsModule {}
