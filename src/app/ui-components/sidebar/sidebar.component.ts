import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  public samplePagesCollapsed = true;
  opened = false;
  @Output() messageSidebarOpened = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  public toggleSidebar() {
    this.opened = false;
    this.messageSidebarOpened.emit(this.opened.toString());
  }
}
