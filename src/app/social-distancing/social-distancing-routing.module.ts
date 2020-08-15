import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { SocialDistancingComponent } from './social-distancing.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'social-distancing',
      component: SocialDistancingComponent,
      data: { title: extract('Social Distancing') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class SocialDistancingRoutingModule {}
