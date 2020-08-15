import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from '@app/ui-components/navbar/navbar.component';
import { SidebarComponent } from '@app/ui-components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '@app/core';
import { FooterComponent } from '@app/ui-components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    CoreModule
  ],
  declarations: [
    HeaderComponent,
    ShellComponent,
    // TODO need to remove once we are done with components.
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class ShellModule {}
