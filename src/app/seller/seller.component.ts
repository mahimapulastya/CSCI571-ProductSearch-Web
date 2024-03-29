import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from '../user.service';
import {
  RoundProgressModule,
  ROUND_PROGRESS_DEFAULTS
  } from 'angular-svg-round-progressbar';


export class KeyValue {
  key: string;
  value: any;

  constructor(public s: string, public v: any) {
    this.key = s;
    this.value = v;
  }
}


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css'],
})

export class SellerComponent implements OnInit {

  public searchresult: any;
  public sellerInfo: KeyValue[] = [];
  public starImage: string;
  public seln: string;
  constructor(private service: UserService) { }

  getSellerDetails(data: any) {
      const details = data.sellerInfo[0];
      this.seln = data.sellerInfo[0].sellerUserName[0].toUpperCase();
      try {
        if (details.feedbackScore[0] !== null) {
          const score = Number(details.feedbackScore[0]);
          if (score >= 10000) {
            this.starImage = 'stars';
          } else {
            this.starImage = 'star_border';
          }
          this.sellerInfo.push(new KeyValue('Feedback Score', score));
        }
      } catch (e) {

      }
      try {
        if (details.positiveFeedbackPercent[0] !== null) {
          let percentage = details.positiveFeedbackPercent[0];
          if (percentage === '100.0') { percentage = '100'; }
          this.sellerInfo.push(new KeyValue('Popularity', percentage));
        }
      } catch (e) {

      }
      try {
        if (details.feedbackRatingStar[0] !== null) {
          const color = details.feedbackRatingStar[0];
          this.sellerInfo.push(new KeyValue('Feedback Rating Star', color));
        }
      } catch (e) {

      }

      try {
        if (details.feedbackRatingStar[0] !== null) {
          const a = details.feedbackRatingStar[0] === 'true' ? true : false;
          this.sellerInfo.push(new KeyValue('Top Rated', a));
        }
      } catch (e) {

      }

      try {
        if (data.storeInfo[0].storeName[0] !== null) {
          const storeName = data.storeInfo[0].storeName[0];
          this.sellerInfo.push(new KeyValue('Store Name', storeName));
        }
      } catch (e) {

      }
      try {
        if (data.storeInfo[0].storeURL[0] !== null) {
          const storelink = data.storeInfo[0].storeURL[0];
          this.sellerInfo.push(new KeyValue('Buy Product At', storelink));
        }
      } catch (e) {

      }
    }

ngOnInit() {
    this.getSellerDetails(this.service.selectedProduct);
  }
}
