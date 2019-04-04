import { Injectable } from '@angular/core';
import { SearchItem } from './result-section/result-section.component';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {
  private myStorage = window.localStorage;
  private map: Map<string, string> = new Map();
  constructor() {

   }

   addItemtoWishList(item) {
    console.log(item);
    if (this.myStorage.getItem(item.itemID) === null) {
      this.myStorage.setItem(item.itemID, JSON.stringify(item));
      this.map.set(item.itemID, item);
      console.log('please add');
    }
    console.log(this.myStorage);
  }

  getAllItems1(id) {
    return this.myStorage.getItem(id);
  }

  getAllWishListItems() {
    var wishlist: SearchItem[] = [];
    const keys = Object.keys(this.myStorage);
    let i = keys.length;

    while ( i-- ) {
      console.log(keys[i]);
      wishlist.push( JSON.parse(this.myStorage.getItem(keys[i])));
    }
    console.log(wishlist);
    return wishlist;
  }

  isPresent(id) {
    return (this.myStorage.getItem(id) != null);
  }

}
