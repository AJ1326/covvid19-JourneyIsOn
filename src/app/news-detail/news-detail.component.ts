import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsDetailService } from '@app/news-detail/news-detail.service';

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('691885a2fb8f43b2bc520d944f892178', {
  corsProxyUrl: 'https://cors-anywhere.herokuapp.com/'
});

@Component({
  selector: 'app-news-card',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {
  version: string | null = environment.version;
  openNewsType = 1;
  newsType: any;
  countryISO: any;
  news: any;
  isLoading = false;
  error: any;
  publishedDate: any;
  newsApiFailed = false;
  isCountryPresent = false;
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
  differentNews: any = [
    'top-news',
    'covid',
    'business',
    'sports',
    'health',
    'technology',
    'science',
    'entertainment'
  ];
  newsDiffType: any[] = [
    { name: 'Top News', code: 'top-news' },
    { name: 'Covid', code: 'covid' },
    { name: 'Business', code: 'business' },
    { name: 'Sports', code: 'sports' },
    { name: 'Health', code: 'health' },
    { name: 'Technology', code: 'technology' },
    { name: 'Science', code: 'science' },
    { name: 'Entertainment', code: 'entertainment' }
  ];

  constructor(
    private route: ActivatedRoute,
    private newsDetailService: NewsDetailService,
    private router: Router
  ) {}

  ngOnInit() {
    const country = JSON.parse(localStorage.getItem('selectedCntry'));
    this.countryISO = country ? country['value'] : 'covid';
    this.route.params.subscribe(params => {
      this.newsType = params['name'];
      this.callNewsAPI(this.newsType);
    });
  }

  isTypePresentInArray(arr: any, value: string) {
    if (arr.indexOf(value.toLowerCase()) > -1) {
      return true;
    } else {
      return false;
    }
  }

  public callNewsAPI(newsType: any) {
    this.isCountryPresent = this.isTypePresentInArray(
      this.newsCountryCode,
      this.countryISO
    );
    this.showNews(this.isCountryPresent, newsType);
  }

  public showNews(isCountryPresent: boolean, newsType: string) {
    let isDiffNews = this.isTypePresentInArray(
      this.differentNews,
      this.newsType
    );
    if (isCountryPresent && isDiffNews) {
      this.callSpecificNewsApi(this.newsType);
    } else {
      this.callWorldTopNews(newsType);
    }
  }

  public callSpecificNewsApi(news_type: any) {
    const country_iso = this.countryISO.toLowerCase();
    newsapi.v2
      .topHeadlines({
        q: '',
        category: news_type.toLowerCase(),
        country: country_iso
      })
      .then((response: any) => {
        if (response.totalResults === 0 || response.status !== 'ok') {
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
        q: news_type.toLowerCase(),
        language: 'en',
        sortBy: 'relevancy'
      })
      .then((response: any) => {
        if (response.status === 'ok') {
          this.news = response.articles;
        } else {
          this.newsApiFailed = true;
        }
        /*
        {
          status: "ok",
          articles: [...]
        }
      */
      });
  }

  public selectNewsModal(news_selected: any) {
    this.router.navigate(['news', news_selected.code]);
  }

  public openNews(openNews: any) {
    this.openNewsType = openNews;
  }
}
