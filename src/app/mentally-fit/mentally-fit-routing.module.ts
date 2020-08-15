import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { MentallyFitComponent } from './mentally-fit.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'how-to-stay-mentally-fit',
      component: MentallyFitComponent,
      data: { title: extract('Covid 19: How to stay mentally fit ?') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MentallyFitRoutingModule {}
