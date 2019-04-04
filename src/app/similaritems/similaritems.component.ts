import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


// tslint:disable-next-line: component-class-suffix
export class SimilarItems {
  index: number;
  productName: string;
  imageURL: string;
  viewItemURL: string;
  price: string;
  shippingCost: string;
  daysLeft: string;
}

@Component({
  selector: 'app-similaritems',
  templateUrl: './similaritems.component.html',
  styleUrls: ['./similaritems.component.css']
})
export class SimilaritemsComponent implements OnInit {

  constructor(private service: UserService, private route: ActivatedRoute) { }
  public similarItemDetails: any;
  public similarData: any[] = [];
  public show = 5;
  public noResults = false;
  public enableSortOrder = false;
  public sortOrder = 'asc';
  public orderType = '0';
  public testArray: any[] = [];
  public itemID: string;

  getSimiliarItemDetails(itemID) {
    this.service.getSimilarProducts(itemID).subscribe((data: {}) => {
      this.similarItemDetails = data;
      const items = this.similarItemDetails.getSimilarItemsResponse.itemRecommendations.item;
      if (items === undefined || items.length === 0) {
        this.noResults = true;
      }

      let i = 0;
      try {
        for (const item of items) {
          this.similarData[i] = new SimilarItems();
          this.similarData[i].index = i + 1;
          try {
          this.similarData[i].productName = item.title;
          } catch (e) {}

          try {
            this.similarData[i].imageURL = item.imageURL;
          } catch (e) {}

          try {
          this.similarData[i].viewItemURL = item.viewItemURL;
          } catch (e) {}

          try {
          this.similarData[i].price =  item.buyItNowPrice.__value__;
          } catch (e) {}

          try {
          this.similarData[i].shippingCost = item.shippingCost.__value__;
          } catch (e) {}

          try {
            const str = item.timeLeft;
            this.similarData[i].daysLeft = Number(str.substr(str.indexOf('P') + 1, str.indexOf('D') - 1));
         } catch (e) {}
          i = i + 1;
        }

        this.testArray  = Object.assign([], this.similarData);
      } catch (e) {}
    });
  }

  selectOrderType() {
    if (this.orderType !== '0') {
      this.enableSortOrder = false;
      this.sortSimilarItems(Number(this.orderType), this.sortOrder);
    } else {
      this.enableSortOrder = true;
      this.resumeOrder();
    }
  }

  changeSortOrder() {
    if (this.orderType !== '0') {
      this.sortSimilarItems(Number(this.orderType), this.sortOrder);
    }
  }

  resumeOrder() {
    for (let i = 0; i < this.similarData.length; i++) {
      this.similarData[i] = this.testArray[i];
    }
  }

  sortSimilarItems(type: number, order: string) {
  switch (type) {
    case 1: {
  // tslint:disable-next-line: only-arrow-functions
   this.similarData.sort(function(o1: SimilarItems, o2: SimilarItems) {
      if (order === 'asc') {
        if (o1.productName < o2.productName) {
          return -1;
        }
        if (o1.productName < o2.productName) {
          return 1;
        }
        return 0;
      } else if (order === 'desc') {
        if (o1.productName > o2.productName) {
          return -1;
        }
        if (o1.productName < o2.productName) {
          return 1;
        }
        return 0;
      }
  });

   break;
    }
    case 2: {
   // tslint:disable-next-line: only-arrow-functions
   this.similarData.sort(function(o1: SimilarItems, o2: SimilarItems) {
    if (order === 'asc') {
      if (parseFloat(o1.daysLeft) < parseFloat(o2.daysLeft)) {
        return -1;
      }
      if (parseFloat(o1.daysLeft) > parseFloat(o2.daysLeft)) {
        return 1;
      }
      return 0;
    } else if (order === 'desc') {
      if (parseFloat(o1.daysLeft) > parseFloat(o2.daysLeft)) {
        return -1;
      }
      if (parseFloat(o1.daysLeft) < parseFloat(o2.daysLeft)) {
        return 1;
      }
      return 0;
    }
});

   break;
    }
    case 3: {
      // tslint:disable-next-line: only-arrow-functions
      this.similarData.sort(function(o1: SimilarItems, o2: SimilarItems) {
        if (order === 'asc') {
          if (parseFloat(o1.price) < parseFloat(o2.price)) {
            return -1;
          }
          if (parseFloat(o1.price) > parseFloat(o2.price)) {
            return 1;
          }
          return 0;
        } else if (order === 'desc') {
          if (parseFloat(o1.price) > parseFloat(o2.price)) {
            return -1;
          }
          if (parseFloat(o1.price) < parseFloat(o2.price)) {
            return 1;
          }
          return 0;
        }
    });

      break;
    }
    case 4: {
      // tslint:disable-next-line: only-arrow-functions
      this.similarData.sort(function(o1: SimilarItems, o2: SimilarItems) {
        if (order === 'asc') {
          if (parseFloat(o1.shippingCost) < parseFloat(o2.shippingCost)) {
            return -1;
          }
          if (parseFloat(o1.shippingCost) > parseFloat(o2.shippingCost)) {
            return 1;
          }
          return 0;
        } else if (order === 'desc') {
          if (parseFloat(o1.shippingCost) > parseFloat(o2.shippingCost)) {
            return -1;
          }
          if (parseFloat(o1.shippingCost) < parseFloat(o2.shippingCost)) {
            return 1;
          }
          return 0;
        }
    });
      break;
    }
  default: {
      console.log('Default Sort');
      break;
  }
 }
}

ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemID = JSON.parse(params['item']).itemID;
    });
    this.enableSortOrder = true;
    this.getSimiliarItemDetails(this.itemID);
  }
}
