import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from './user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';

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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit {
  showResults = true;
  registered = false;
  submitted = false;
  userForm: FormGroup;
  conditionsArray: string[] = [];
  shippingOptions: string[] = [];

  public products: any = [];
  public zip: any;
  private fb: FormBuilder;
  public showProgressBar: boolean;
  public distance: number;
  public customLocationDisable: boolean;
  params: number;
  public searchresult: any = [];
  public searchItem: SearchItem[] = [];


  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.customLocationDisable = true;
    this.userForm = new FormGroup({
    keyword: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    categoryselect: new FormControl(''),
    newCategory: new FormControl(''),
    usedCategory: new FormControl(''),
    unspecifiedCategory: new FormControl(''),
    localpickup: new FormControl(''),
    freeshipping: new FormControl(''),
    });
    this.getPostalCodes();
    this.getZipCode();
  }

  getPostalCodes() {
    this.userForm.get('zipcode').valueChanges.pipe().subscribe(data => {
      this.userService.getZipCode(data).subscribe(response => {
          this.products = response;
      });
  });
    //   this.userService.getZipCode(code).subscribe((data: {}) => {
    //   this.products = data;
    // });
  }

  getZipCode() {
    this.userService.getPostalCode().subscribe((data: {}) => {
      this.zip = data;
    });
  }

  switchToResult() {
    document.getElementById('results').className = 'nav-link active';
    document.getElementById('wishlist').className = 'nav-link';
    document.getElementById('results').style.backgroundColor = 'black';
    document.getElementById('wishlist').style.backgroundColor = 'white';
    document.getElementById('results').style.color = 'white';
    document.getElementById('wishlist').style.color = 'black';
  }

  switchToWishList() {
    document.getElementById('wishlist').className = 'nav-link active';
    document.getElementById('results').className = 'nav-link';
    document.getElementById('wishlist').style.backgroundColor = 'black';
    document.getElementById('results').style.backgroundColor = 'white';
    document.getElementById('wishlist').style.color = 'white';
    document.getElementById('results').style.color = 'black';
  }

  getSearchItem() {
    // keyword,category,distance,conditions,shippingOptions,zipCode
    this.userService.getEbayProducts('iphone').subscribe((data: {}) => {
      this.searchresult = data;
      let i = 0;
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
    });
  }

  public onSubmit() {
    const formValue = this.userForm.value;
    console.log('ddddddd  ' + this.distance);
    this.params = this.distance;

    if (this.distance === null || this.distance === undefined) {
      this.distance = 10;
    }

    if (formValue.newCategory !== '' && formValue.newCategory) {
      this.conditionsArray.push('New');
    }
    if (formValue.usedCategory !== '' && formValue.usedCategory) {
      this.conditionsArray.push('Used');
    }
    if (formValue.unspecifiedCategory !== '' && formValue.unspecifiedCategory) {
      this.conditionsArray.push('Unspecified');
    }

    (formValue.localpickup !== '' && formValue.localpickup) ? this.shippingOptions.push('true') : this.shippingOptions.push('false');
    (formValue.freeshipping !== '' && formValue.freeshipping) ? this.shippingOptions.push('true') : this.shippingOptions.push('false');

    this.submitted = true;
    if (this.userForm.invalid === true) {
      return;
    } else {
      this.registered = true;
    }

    this.getSearchItem();
  }

  clear() {
    this.switchToResult();
  }
}
