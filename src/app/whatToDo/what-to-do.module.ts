import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { WhatToDoRoutingModule } from './what-to-do-routing.module';
import { WhatToDoComponent } from './what-to-do.component';

@NgModule({
  imports: [CommonModule, TranslateModule, WhatToDoRoutingModule],
  declarations: [WhatToDoComponent]
})
export class WhatToDoModule {}
