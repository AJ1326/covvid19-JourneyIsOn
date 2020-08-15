import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  version: string | null = environment.version;
  openNewsType = 1;

  constructor() {}

  ngOnInit() {}

  public openNews(openNews: any) {
    this.openNewsType = openNews;
  }
}
