import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  opened = false;

  constructor() {}

  ngOnInit() {}

  public receiveSidebarMessage($event: any) {
    if ($event === 'true') {
      this.opened = true;
    } else {
      this.opened = false;
    }
  }
}
