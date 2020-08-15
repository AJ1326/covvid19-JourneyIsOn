import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { WorldMapComponent } from './world-map.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'world-map',
      component: WorldMapComponent,
      data: { title: extract('Home') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WorldMapRoutingModule {}
