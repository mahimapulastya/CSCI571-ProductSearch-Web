import { TabPaneItem } from './tab-pane';
import { Injectable } from '@angular/core';
import {ProductComponent} from '../product/product.component';
import {PhotosComponent} from '../photos/photos.component';
import {ShippingComponent} from '../shipping/shipping.component';
import { SellerComponent} from '../seller/seller.component';
import {SimilaritemsComponent} from '../similaritems/similaritems.component';

@Injectable()
export class TabPaneService {
  constructor() {}

  public getTabPanes(): TabPaneItem[] {
    return [
      new TabPaneItem(ProductComponent),
      new TabPaneItem(PhotosComponent),
      new TabPaneItem(ShippingComponent),
      new TabPaneItem(SellerComponent),
      new TabPaneItem(SimilaritemsComponent)
    ];
  }
}
