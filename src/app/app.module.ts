import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from '@app/modal/modal.module';
import { CountryTableModule } from '@app/country-table/country-table.module';
import { TransRateModule } from '@app/trans-rate/trans-rate.module';
import { AgeSexModule } from '@app/age-sex/age-sex.module';
import { SymptomsModule } from '@app/symptoms/symptoms.module';
import { WorldMapModule } from '@app/world-map/world-map.module';
import { PreventionModule } from '@app/prevention/prevention.module';
import { NewsCardModule } from '@app/news-card/news-card.module';
import { NewsModule } from '@app/news/news.module';
import { CountryWiseModalModule } from '@app/country-wise-modal/country-wise-modal.module';
import { NewsDetailModule } from './news-detail/news-detail.module';
import { CalculatorModule } from '@app/calculator/calculator.module';
import { HomeDashboardModule } from './home-dashboard/home-dashboard.module';
import { SocialDistancingModule } from '@app/social-distancing/social-distancing.module';
import { Covid19CalculatorModule } from '@app/covid-19-calculator/covid19-calculator.module';
import { WhatToDoModule } from '@app/whatToDo/what-to-do.module';
import { EconomyImpactModule } from '@app/economyImpact/economy-impact.module';
import { MentallyFitModule } from '@app/mentally-fit/mentally-fit.module';
import { IndiaModule } from '@app/india/india.module';
import { PwaService } from '@app/pwa.service';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production
    }),
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    RouterModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    WorldMapModule,
    NewsDetailModule,
    HomeDashboardModule,
    Covid19CalculatorModule,
    SocialDistancingModule,
    NewsModule,
    CalculatorModule,
    CountryWiseModalModule,
    NewsCardModule,
    PreventionModule,
    SymptomsModule,
    TransRateModule,
    ModalModule,
    AgeSexModule,
    WhatToDoModule,
    MentallyFitModule,
    EconomyImpactModule,
    IndiaModule,
    LoginModule,
    CountryTableModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [PwaService],
  bootstrap: [AppComponent]
})
export class AppModule {}
