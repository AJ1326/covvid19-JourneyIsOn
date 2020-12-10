import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [ModalComponent],
  declarations: [ModalComponent]
})
export class ModalModule {}
