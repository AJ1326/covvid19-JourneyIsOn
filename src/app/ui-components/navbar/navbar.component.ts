import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  @Output() messageSidebarOpened = new EventEmitter<string>();
  @Input() opened: boolean;

  constructor(config: NgbDropdownConfig) {
    config.placement = 'bottom-right';
  }

  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    } else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  ngOnInit() {}

  public toggleSidebar() {
    this.opened = !this.opened;
    this.messageSidebarOpened.emit(this.opened.toString());
  }
}
