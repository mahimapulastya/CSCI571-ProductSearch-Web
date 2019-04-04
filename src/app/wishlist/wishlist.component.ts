import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../wishlist.service';
import { SearchItem } from '../result-section/result-section.component';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private service: WishlistService) { }
  public enableWishlistButton: boolean;
  public wishlistItems: SearchItem[];
  public totalPrice: number;

  showWishlistDetails() {
  }

  totalShopping() {
    this.totalPrice = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.wishlistItems.length; i++) {
        console.log(this.wishlistItems[i].price);
        this.totalPrice = this.totalPrice + parseFloat(this.wishlistItems[i].price);
    }
    this.totalPrice = parseFloat(this.totalPrice.toFixed(2));
  }

  removeFromWishList() {
    console.log('Remove');
  }

  goToDetails(ind: number) {
    this.router.navigate(['/itemDetails']);
    // this.enableDetailsButton = false;
    this.userService.selectedProduct = this.userService.allProducts[ind];
  }

  ngOnInit() {
    this.wishlistItems = this.service.getAllWishListItems();
    this.totalShopping();
  }

}
