import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WorldMapRoutingModule } from './world-map-routing.module';
import { WorldMapComponent } from './world-map.component';

@NgModule({
  imports: [CommonModule, TranslateModule, WorldMapRoutingModule],
  exports: [WorldMapComponent],
  declarations: [WorldMapComponent]
})
export class WorldMapModule {}
