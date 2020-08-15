import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  version: string | null = environment.version;
  Arr = Array; // Array type captured in a variable
  num = 20;

  constructor(private router: Router) {}

  ngOnInit() {
    const today = new Date();
  }

  public openSpecificNews(news_type: string) {
    this.router.navigate(['news', news_type]);
  }
}
