import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { TransRateComponent } from '@app/trans-rate/trans-rate.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'trans-rate', component: TransRateComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    // TODO Below urls are just for reff purpose need to delete it once it is done.
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
