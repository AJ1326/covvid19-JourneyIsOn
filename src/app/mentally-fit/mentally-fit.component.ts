import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { ModalService } from '@app/modal/modal.service';

@Component({
  selector: 'app-about',
  templateUrl: './mentally-fit.component.html',
  styleUrls: ['./mentally-fit.component.scss']
})
export class MentallyFitComponent implements OnInit {
  version: string | null = environment.version;
  mindfull = false;
  anxiety = false;
  mentalHealth = false;
  setID = '';

  constructor(private modalService: ModalService) {}

  ngOnInit() {}

  openVideo(id: string) {
    this.modalService.open(id);
  }

  closeVideo(id: string) {
    this.modalService.close(id);
  }
}
