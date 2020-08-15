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

  videoDisplayType(id: string, status: boolean) {
    this.setID = id;
    switch (id) {
      case 'mindfull':
        this.mindfull = status;
        break;
      case 'anxiety':
        this.anxiety = status;
        break;
      case 'mentalHealth':
        this.anxiety = status;
        break;
    }
  }

  openVideo(id: string, status: boolean) {
    this.videoDisplayType(id, status);
    this.modalService.open(id);
  }

  closeVideo(id: string, status: boolean) {
    this.modalService.close(id);
    this.videoDisplayType(id, status);
  }
}
