import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsDetailService } from '@app/news-detail/news-detail.service';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('691885a2fb8f43b2bc520d944f892178');

@Component({
  selector: 'app-news-card',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  version: string | null = environment.version;
  openNewsType = 1;
  newsDiffType: any[];
  newsType: any;
  countryISO: any;
  news: any;
  isLoading = false;
  error: any;
  publishedDate: any;
  newsApiFailed = false;
  newsCountryCode = [
    'ar',
    'au',
    'at',
    'be',
    'br',
    'bg',
    'cn',
    'ca',
    'cu',
    'co',
    'cz',
    'eg',
    'fr',
    'de',
    'gr',
    'hk',
    'hu',
    'in',
    'id',
    'ie',
    'il',
    'it',
    'jp',
    'lv',
    'lt',
    'my',
    'mx',
    'ma',
    'nl',
    'nz',
    'ng',
    'no',
    'ph',
    'pl',
    'pt',
    'ro',
    'ru',
    'sa',
    'rs',
    'sg',
    'sk',
    'si',
    'za',
    'kr',
    'se',
    'ch',
    'tw',
    'th',
    'tr',
    'ae',
    'ua',
    'gb',
    'us',
    've'
  ];

  constructor(
    private route: ActivatedRoute,
    private newsDetailService: NewsDetailService,
    private router: Router
  ) {
    this.newsDiffType = [
      { name: 'Top News', code: 'Top-news' },
      { name: 'Covid', code: 'Covid' },
      { name: 'Business', code: 'business' },
      { name: 'Sports', code: 'sports' },
      { name: 'Health', code: 'health' },
      { name: 'Technology', code: 'technology' },
      { name: 'Science', code: 'science' },
      { name: 'Entertainment', code: 'entertainment' }
    ];
  }

  ngOnInit() {
    const country = JSON.parse(localStorage.getItem('selectedCntry'));
    this.countryISO = country.value;
    this.route.params.subscribe(params => {
      this.newsType = params['name'];
      this.callNewsAPI(this.newsType);
    });
  }

  public callNewsAPI(newsType: any) {
    if (
      newsType === 'business' ||
      newsType === 'sports' ||
      newsType === 'health' ||
      newsType === 'technology' ||
      newsType === 'science' ||
      newsType === 'entertainment'
    ) {
      this.callSpecificNewsApi(this.newsType);
    } else if (newsType === 'Top-news') {
      this.callSpecificNewsApi('');
    } else {
      this.callWorldTopNews(this.newsType);
    }
  }

  public callSpecificNewsApi(news_type: any) {
    const country_iso = 'IN';
    newsapi.v2
      .topHeadlines({
        category: news_type,
        country: country_iso
      })
      .then((response: any) => {
        if (response.length === 0) {
          this.callWorldTopNews(this.newsType);
        } else {
          this.news = response.articles;
        }
        /*
        {
          status: "ok",
          sources: [...]
        }
      */
      })
      .then((error: any) => {
        this.callWorldTopNews(this.newsType);
      });
  }

  showDateHeader(date: any) {
    if (this.publishedDate) {
      this.compareDate(this.publishedDate, new Date(date));
    } else {
      this.publishedDate = new Date(date);
      return true;
    }
  }

  compareDate(d1: any, d2: any) {
    if (d1 === d2) {
      return false;
    } else {
      return true;
    }
  }

  public callWorldTopNews(news_type: any) {
    newsapi.v2
      .everything({
        q: 'COVID',
        language: 'en',
        sortBy: 'relevancy'
      })
      .then((response: any) => {
        this.news = response.articles;
        /*
        {
          status: "ok",
          articles: [...]
        }
      */
      })
      .then((error: any) => {
        this.newsApiFailed = true;
      });
  }

  public selectNewsModal(news_selected: any) {
    // this.newsType = news_selected.code;
    // this.callNewsAPI(this.newsType);
    this.router.navigate(['news', news_selected.code]);
  }

  public openNews(openNews: any) {
    this.openNewsType = openNews;
  }
}
