import { Component, OnInit, Input} from '@angular/core';

import {TabItemService} from '../tabs/tab-item-service';
import {TabPaneService} from '../tabs/tab-pane-service';

import {TabPaneItem} from '../tabs/tab-pane';
import {TabItem} from '../tabs/tab-item';

import {ProductComponent} from '../product/product.component';
import {PhotosComponent} from '../photos/photos.component';
import { from } from 'rxjs';
import {UserService} from '../user.service';
import { SearchItem } from '../result-section/result-section.component';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { trigger, transition, animate, style } from '@angular/animations';
import { WishlistService } from '../wishlist.service';


@Component({
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.css'],
  animations: [
    trigger('showDetailsAnimation', [
      transition('void => *',  [
        style({transform: 'translateX(100%)'}),
        animate('1s')
      ]),
      transition('void => *',  [
        style({transform: 'translateX(100%)'}),
        animate('1s')
      ])
    ]),
    trigger('showSearchResultAnimation', [
      transition('void => *',  [
        style({transform: 'translateX(-100%)'}),
        animate('1s')
      ]),
      transition('* => void',  [
        style({transform: 'translateX(100%)'}),
        animate('1s')
      ])
    ])
  ]
})
export class DetailsSectionComponent implements OnInit {

  @Input() item: SearchItem;
  public params: any;
  public itemDetails: any;
  public searchItemString: string;
  // tslint:disable-next-line: max-line-length
  constructor(private tpservice: TabPaneService, private wishlistservice: WishlistService,
              private location: Location, private tiservice: TabItemService,
              private userService: UserService, private route: ActivatedRoute, private router: Router) { }
  public tabPaneItems: TabPaneItem[];
  public tabItems: TabItem[];
  public searchItem: any = [];
  public searchresult: any;
  public index: number;

  toggleDetailsDiv2() {
    this.location.back();
  }

  addToWishList() {
    console.log(this.userService.selectedProduct);
    const item = this.userService.selectedProduct;
    const tempItem = new SearchItem();
    tempItem.image = item.galleryURL[0];
    tempItem.itemID = item.itemId[0];
    if (item.title[0].length > 35) {
      const st = item.title[0].substring(0, 36);
      if (st.charAt(36) === ' ') {
        tempItem.shortTitle = '...';
      } else {
        let k = 35;
        for (k = 35; ; k--) {
          if (st.charAt(k) === ' ') {
            break;
          }
        }
        tempItem.shortTitle = st.substring(0, k) + '...';
      }
    } else {
      tempItem.shortTitle = item.title[0];
    }
    tempItem.title = item.title[0];


    tempItem.price =  item.sellingStatus[0].currentPrice[0].__value__;
    const s: string = item.shippingInfo[0].shippingServiceCost[0].__value__;
    if (s === '0.0') {
      tempItem.shipping = 'Free Shipping';
    } else {
      tempItem.shipping = '$' + s;
    }
    tempItem.zip = item.postalCode[0];
    tempItem.seller = item.sellerInfo[0].sellerUserName[0].toUpperCase();
    tempItem.viewItemURL = item.viewItemURL[0];
    this.wishlistservice.addItemtoWishList(tempItem);
  }

  isPresent() {
    return this.wishlistservice.isPresent(this.userService.selectedProduct.itemId[0]);
  }

  removeItemID() {
    // console.log('Remove' + itemID);
    this.wishlistservice.removeFromWishList(this.userService.selectedProduct.itemId[0]);
  }

  ngOnInit() {
    console.log(this.item);
    this.searchItem = this.userService.selectedProduct;
    this.tabItems = this.tiservice.getTabItem();
    this.tabPaneItems = this.tpservice.getTabPanes();
  }
}
