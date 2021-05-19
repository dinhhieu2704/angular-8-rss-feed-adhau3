import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as xml2js from 'xml2js';
import { NewsRss } from './news-rss';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  RssData: any;
  constructor(private http: HttpClient) {}
  GetRssFeedData() {
    this.getData().then(
      rs => {
        let parseString = xml2js.parseString;
        parseString(rs, (err, result: NewsRss) => {
          this.RssData = result;
          console.log(this.RssData.rss.channel[0].item);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getData() {
    const requestOptions: Object = {
      headers: new HttpHeaders().set(
        'Content-Type',
        'text/plain; charset=utf-8'
      ),
      responseType: 'text' as 'json'
    };
    return this.http
      .get<any>('https://dangcongsan.vn/so-do-website/rss/251', requestOptions)
      .toPromise();
  }
}

export interface IRssData {}
