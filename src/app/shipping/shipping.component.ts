import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

export class KeyValue {
  key: string;
  value: any;

  constructor(public s: string, public v: any) {
    this.key = s;
    this.value = v;
  }
}

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {

  constructor(private service: UserService) { }
  public shippingDetails: KeyValue[] = [];
  public searchresult: any = [];
  public shippingServiceCost: string;

  isString(val) { return typeof val === 'string'; }

  isBoolean(val) { return typeof val === 'boolean'; }

  getShippingDetails(index: number) {
    // keyword,category,distance,conditions,shippingOptions,zipCode
    this.service.getEbayProducts('iphone').subscribe((data: {}) => {
      this.searchresult = data;
      try {
      const details = this.searchresult.findItemsAdvancedResponse[0].searchResult[0].item[index].shippingInfo[0];
      try {
        if (details.shippingServiceCost[0].__value__ !== null) {
          // tslint:disable-next-line: max-line-length
          const deliveryOption = details.shippingServiceCost[0].__value__ === '0.0' ? 'Free Shipping' : details.shippingServiceCost[0].__value__;
          this.shippingDetails.push(new KeyValue('Shipping Cost', deliveryOption));
        }
      } catch (e) {}

      try {
      if (details.shipToLocations[0] !== null) {
        this.shippingDetails.push(new KeyValue('Shipping Locations', details.shipToLocations[0]));
      }
      } catch (e) {}

      try {
        if (details.handlingTime[0] !== null) {
          const b = details.handlingTime[0] + (Number(details.handlingTime[0]) > 1 ? ' Days' : ' Day');
          this.shippingDetails.push(new KeyValue('Handling Time', b));
        }
      }  catch (e) {}

      try {
        if (details.expeditedShipping[0] !== null) {
          const a = details.expeditedShipping[0] === 'true' ? true : false;
          this.shippingDetails.push(new KeyValue('Expedited Shipping', a));
        }
      } catch (e) {}

      try {
        if (details.oneDayShippingAvailable[0] !== null) {
          const a = details.oneDayShippingAvailable[0] === 'true' ? true : false;
          this.shippingDetails.push(new KeyValue('One Day Shipping', a));
        }
      } catch (e) {}

      try {
        if (this.searchresult.findItemsAdvancedResponse[0].searchResult[0].item[index].returnsAccepted !== null) {
          const r = this.searchresult.findItemsAdvancedResponse[0].searchResult[0].item[index].returnsAccepted[0] === 'true' ? true : false;
          this.shippingDetails.push(new KeyValue('Return Accepted', r));
        }
      } catch (e) {}
    } catch (e) {
    }
    });
  }
  ngOnInit() {
    this.getShippingDetails(0);
  }

}
