import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ChartModule
  ],
  declarations: [LoaderComponent, SpinnerComponent],
  providers: [SpinnerService],
  exports: [LoaderComponent, SpinnerComponent]
})
export class SharedModule {}
