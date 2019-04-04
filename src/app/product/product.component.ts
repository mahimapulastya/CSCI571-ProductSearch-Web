import { Component, OnInit, Input } from '@angular/core';
import { EbayItemDetail, UserService } from '../user.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';



// tslint:disable-next-line: component-class-suffix
export class NameValue {
  name: string;
  value: string;
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private service: UserService, private route: ActivatedRoute) { }
  public itemDetails: any;
  public images: string[] = [];
  public nameValue: NameValue[] = [];
  display = 'none';
  public itemID: string;

  getProductDetails(itemID) {
    this.service.getEbayProductDetails(itemID).subscribe((data: {}) => {
      this.itemDetails = data;
      let i = 0;
      try {
      for (const item of this.itemDetails.Item.ItemSpecifics.NameValueList) {
        this.nameValue[i] = new NameValue();
        this.nameValue[i].name = item.Name;
        this.nameValue[i].value = item.Value;
        i = i + 1;
      }
    } catch (e) {}
      try {
      this.images = this.itemDetails.Item.PictureURL;
      } catch (e) {}
    });
  }

  openModalDialog() {
    this.display = 'block';
 }

  closeModalDialog() {
    this.display = 'none';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.itemID = JSON.parse(params['item']).itemID;
    });

    this.getProductDetails(this.itemID);
  }

}
