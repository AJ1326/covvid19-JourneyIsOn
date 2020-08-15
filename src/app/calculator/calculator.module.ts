import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CalculatorRoutingModule } from './calculator-routing.module';
import { CalculatorComponent } from './calculator.component';

@NgModule({
  imports: [CommonModule, TranslateModule, CalculatorRoutingModule],
  declarations: [CalculatorComponent]
})
export class CalculatorModule {}
