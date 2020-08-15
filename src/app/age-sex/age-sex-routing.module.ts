import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { AgeSexComponent } from './age-sex.component';
import { Shell } from '@app/shell/shell.service';
import { HomeComponent } from '@app/home/home.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'age-sex-ratio',
      component: AgeSexComponent,
      data: { title: extract('Age-sex Ratio') }
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AgeSexRoutingModule {}
