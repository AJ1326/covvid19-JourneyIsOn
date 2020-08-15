import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { DashboardComponent } from '@app/ui-components/dashboard/dashboard.component';
import { FormsComponent } from '@app/ui-components/forms/forms.component';
import { TablesComponent } from '@app/ui-components/tables/tables.component';
import { IconsComponent } from '@app/ui-components/icons/icons.component';
import { TypographyComponent } from '@app/ui-components/typography/typography.component';
import { AlertsComponent } from '@app/ui-components/alerts/alerts.component';
import { AccordionsComponent } from '@app/ui-components/accordions/accordions.component';
import { BadgesComponent } from '@app/ui-components/badges/badges.component';
import { ButtonsComponent } from '@app/ui-components/buttons/buttons.component';
import { ProgressbarComponent } from '@app/ui-components/progressbar/progressbar.component';
import { BreadcrumbsComponent } from '@app/ui-components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from '@app/ui-components/pagination/pagination.component';
import { DropdownComponent } from '@app/ui-components/dropdown/dropdown.component';
import { TooltipsComponent } from '@app/ui-components/tooltips/tooltips.component';
import { CarouselComponent } from '@app/ui-components/carousel/carousel.component';
import { TabsComponent } from '@app/ui-components/tabs/tabs.component';
import { TransRateComponent } from '@app/trans-rate/trans-rate.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'trans-rate', component: TransRateComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    // TODO Below urls are just for reff purpose need to delete it once it is done.
    { path: 'dashboard', component: DashboardComponent },
    { path: 'forms', component: FormsComponent },
    { path: 'buttons', component: ButtonsComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'alerts', component: AlertsComponent },
    { path: 'accordions', component: AccordionsComponent },
    { path: 'badges', component: BadgesComponent },
    { path: 'progressbar', component: ProgressbarComponent },
    { path: 'breadcrumbs', component: BreadcrumbsComponent },
    { path: 'pagination', component: PaginationComponent },
    { path: 'dropdowns', component: DropdownComponent },
    { path: 'tooltips', component: TooltipsComponent },
    { path: 'carousel', component: CarouselComponent },
    { path: 'tabs', component: TabsComponent }
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
