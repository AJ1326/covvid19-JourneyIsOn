import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { IndiaComponent } from './india.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'my-india',
      component: IndiaComponent,
      data: { title: extract('India dashboard') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class IndiaRoutingModule {}
