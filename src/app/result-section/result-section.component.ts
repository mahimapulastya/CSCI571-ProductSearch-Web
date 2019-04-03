import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { Params } from '@angular/router';

// tslint:disable-next-line: component-class-suffix
export class SearchItem {
  index: number;
  image: string;
  title: string;
  price: string;
  shipping: string;
  zip: string;
  seller: string;
  viewItemURL: string;
}

@Component({
  selector: 'app-result-section',
  templateUrl: './result-section.component.html',
  styleUrls: ['./result-section.component.css'],
  animations: [
    trigger('showDetailsAnimation', [
      transition('void => *',  [
        style({transform: 'translateX(100%)'}),
        animate('1s')
      ]),
      transition('void => *',  [
      ])
    ]),
    trigger('showSearchResultAnimation', [
      transition('void => *',  [
        style({transform: 'translateX(-100%)'}),
        animate('1s')
      ]),
      transition('* => void',  [
      ])
    ])
  ]
})
export class ResultSectionComponent implements OnInit {

  @Input() params: Params;
  public toggleDetailsSection = false;
  public enableDetailsButton;
  public index: number;

  public searchresult: any = [];
  public searchItem: SearchItem[] = [];

  toggleDetailsDiv(index: number) {
    this.index = index;
    console.log(this.index);
    this.enableDetailsButton = false;
    this.toggleDetailsSection = this.toggleDetailsSection ? false : true;
  }

  constructor(private userService: UserService) {
  }

  // keyword,category,distance,conditions,shippingOptions,zip
  getSearchItem(keyword, distance, category, conditions, shippingOptions, zip) {
    this.userService.getEbayProducts(keyword, distance, category, conditions, shippingOptions, zip).subscribe((data: {}) => {
      this.searchresult = data;
      let i = 0;
      if (this.searchresult.findItemsAdvancedResponse[0].searchResult[0]['@count'] !== '0') {
      for (const item of this.searchresult.findItemsAdvancedResponse[0].searchResult[0].item) {
        this.searchItem[i] = new SearchItem();
        this.searchItem[i].index = i + 1;
        this.searchItem[i].image = item.galleryURL[0];
        this.searchItem[i].title = item.title[0];
        this.searchItem[i].price = '$' + item.sellingStatus[0].currentPrice[0].__value__;
        const s: string = item.shippingInfo[0].shippingServiceCost[0].__value__;
        if (s === '0.0') {
          this.searchItem[i].shipping = 'Free Shipping';
        } else {
          this.searchItem[i].shipping = '$' + s;
        }
        this.searchItem[i].zip = item.postalCode[0];
        this.searchItem[i].seller = item.sellerInfo[0].sellerUserName[0].toUpperCase();
        this.searchItem[i].viewItemURL = item.viewItemURL[0];
        i = i + 1;
      }
    }
    });
  }

  // shareOnFb(){
  //     FB.ui({
  //       method: 'share',
  //       href: 'https://developers.facebook.com/docs/',
  //     }, function(response){});
  //   }

  ngOnInit() {
    this.enableDetailsButton = true;

    // this.params.valueChanges.pipe().subscribe(data => {
    // // this.userService.getSearchItem(data.).subscribe(response => {
    // //     this.products = response;
    // // });
    // console.log(data);
    // });
    // tslint:disable-next-line: max-line-length
    console.log(this.params);
  // tslint:disable-next-line: max-line-length
    this.getSearchItem(this.params.keyword, this.params.distance, this.params.category, this.params.condition, this.params.shippingOptions, this.params.zip);
  }
}
