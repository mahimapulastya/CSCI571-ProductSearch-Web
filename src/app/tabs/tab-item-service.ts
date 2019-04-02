import { TabItem } from './tab-item';
import { Injectable } from '@angular/core';

@Injectable()
export class TabItemService {
  constructor() {}

  public getTabItem(): TabItem[] {
    return [
      new TabItem('Product', true),
      new TabItem('Photos', false),
      new TabItem('Shipping', false),
      new TabItem('Seller', false),
      new TabItem('Similar Products', false)
    ];
  }
}
