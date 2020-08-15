import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Covid19CalculatorRoutingModule } from './covid19-calculator-routing.module';
import { Covid19CalculatorComponent } from './covid19-calculator.component';
import { ModalModule } from '@app/modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    Covid19CalculatorRoutingModule,
    ModalModule
  ],
  declarations: [Covid19CalculatorComponent]
})
export class Covid19CalculatorModule {}
