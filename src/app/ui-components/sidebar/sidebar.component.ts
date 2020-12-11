import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalService } from '@app/modal/modal.service';
import { PwaService } from '@app/pwa.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  opened = false;
  @Output() messageSidebarOpened = new EventEmitter<string>();
  constructor(private modalService: ModalService, public Pwa: PwaService) {}

  ngOnInit() {}

  installPwa(): void {
    this.Pwa.promptEvent.prompt();
  }

  public toggleSidebar() {
    this.opened = false;
    this.messageSidebarOpened.emit(this.opened.toString());
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
