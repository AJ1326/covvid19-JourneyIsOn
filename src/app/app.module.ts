import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from '@app/ui-components/navbar/navbar.component';
import { SidebarComponent } from '@app/ui-components/sidebar/sidebar.component';
import { FooterComponent } from '@app/ui-components/footer/footer.component';
import { DashboardComponent } from '@app/ui-components/dashboard/dashboard.component';
import { FormsComponent } from '@app/ui-components/forms/forms.component';
import { ButtonsComponent } from '@app/ui-components/buttons/buttons.component';
import { TablesComponent } from '@app/ui-components/tables/tables.component';
import { AccordionsComponent } from '@app/ui-components/accordions/accordions.component';
import { IconsComponent } from '@app/ui-components/icons/icons.component';
import { TypographyComponent } from '@app/ui-components/typography/typography.component';
import { AlertsComponent } from '@app/ui-components/alerts/alerts.component';
import { BadgesComponent } from '@app/ui-components/badges/badges.component';
import { ProgressbarComponent } from '@app/ui-components/progressbar/progressbar.component';
import { BreadcrumbsComponent } from '@app/ui-components/breadcrumbs/breadcrumbs.component';
import { PaginationComponent } from '@app/ui-components/pagination/pagination.component';
import { DropdownComponent } from '@app/ui-components/dropdown/dropdown.component';
import { TooltipsComponent } from '@app/ui-components/tooltips/tooltips.component';
import { CarouselComponent } from '@app/ui-components/carousel/carousel.component';
import { TabsComponent } from '@app/ui-components/tabs/tabs.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    RouterModule,
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    LoginModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [
    AppComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
