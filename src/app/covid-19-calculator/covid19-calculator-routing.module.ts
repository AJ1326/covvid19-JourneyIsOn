import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Covid19CalculatorComponent } from './covid19-calculator.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'covid-calculator',
      component: Covid19CalculatorComponent,
      data: { title: extract('Covid Calculator') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class Covid19CalculatorRoutingModule {}
