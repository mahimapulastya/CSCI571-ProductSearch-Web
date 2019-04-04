import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// tslint:disable-next-line: component-class-suffix
export class SearchItem {
  index: number;
  image: string;
  shortTitle: string;
  title: string;
  price: string;
  shipping: string;
  zip: string;
  seller: string;
  viewItemURL: string;
  itemID: string;
  sellerInfo: any;
  shippingInfo: any;
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

  public toggleDetailsSection = false;
  public enableDetailsButton;
  public index: number;

  public searchresult: any = [];
  public searchItem: SearchItem[] = [];
  public noResults = false;
  public showSearchResults = false;
  public params: any;
  public pageEntries = 0;
  public ack = '';
  public showProgressBar: boolean;
  public test: string;

  toggleDetailsDiv(index: number) {
    this.index = index;
    this.enableDetailsButton = false;
    this.toggleDetailsSection = this.toggleDetailsSection ? false : true;
  }

  goToDetails(ind: number) {
    this.router.navigate(['/itemDetails']);
    this.userService.selectedProduct = this.userService.allProducts[ind];
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  // keyword,category,distance,conditions,shippingOptions,zip
  getSearchItem(keyword, distance, category, conditions, shippingOptions, zip) {
    this.showProgressBar = true;
    this.userService.getEbayProducts(keyword, distance, category, conditions, shippingOptions, zip).subscribe((data: {}) => {
      this.searchresult = data;
      let i = 0;
      if (this.searchresult.findItemsAdvancedResponse[0].searchResult[0]['@count'] !== '0') {
      this.userService.allProducts = this.searchresult.findItemsAdvancedResponse[0].searchResult[0].item;
      for (const item of this.searchresult.findItemsAdvancedResponse[0].searchResult[0].item) {
        this.searchItem[i] = new SearchItem();
        this.searchItem[i].index = i + 1;
        this.searchItem[i].image = item.galleryURL[0];
        this.searchItem[i].itemID = item.itemId[0];
        if (item.title[0].length > 35) {
          const st = item.title[0].substring(0, 36);
          if (st.charAt(36) === ' ') {
            this.searchItem[i].shortTitle = '...';
          } else {
            let k = 35;
            for (k = 35; ; k--) {
              if (st.charAt(k) === ' ') {
                break;
              }
            }
            this.searchItem[i].shortTitle = st.substring(0, k) + '...';
          }
        } else {
          this.searchItem[i].shortTitle = item.title[0];
        }
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
      // this.showSearchResults = true;
      this.noResults = !(this.searchItem.length > 0);
      this.showProgressBar = !(this.searchItem.length > 0);
      if (this.searchresult.findItemsAdvancedResponse[0].paginationOutput !== undefined) {
        this. pageEntries = this.searchresult.findItemsAdvancedResponse[0].paginationOutput[0].totalEntries[0];
      }
      this.ack = this.searchresult.findItemsAdvancedResponse[0].ack[0];
      if (this.ack === 'Success') {
        this.showProgressBar = false;
      }
    } else {
      this.showProgressBar = false;
      this.noResults = true;
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
    this.route.queryParams.subscribe(data => {
      if (data['params'] === undefined) {
        this.showProgressBar = false;
      } else {
        this.params = JSON.parse(data['params']);
        // tslint:disable-next-line: max-line-length
        this.getSearchItem(this.params.keyword, this.params.distance, this.params.category, this.params.condition, this.params.shippingOptions, this.params.zip);
      }
      console.log(data['params']);
    });
  }
}
