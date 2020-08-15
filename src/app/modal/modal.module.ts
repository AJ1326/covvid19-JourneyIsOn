import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ModalRoutingModule } from './modal-routing.module';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, TranslateModule, ModalRoutingModule],
  exports: [ModalComponent],
  declarations: [ModalComponent]
})
export class ModalModule {}
