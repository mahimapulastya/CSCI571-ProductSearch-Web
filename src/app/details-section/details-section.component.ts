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
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';


@Component({
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.css']
})
export class DetailsSectionComponent implements OnInit {

  @Input() item: SearchItem;
  public itemDetails: any;
  public searchItemString: string;
// tslint:disable-next-line: max-line-length
  constructor(private tpservice: TabPaneService, private location: Location, private tiservice: TabItemService, private userService: UserService, private route: ActivatedRoute) { }
  public tabPaneItems: TabPaneItem[];
  public tabItems: TabItem[];
  public searchItem: any = [];

  toggleDetailsDiv1() {
    this.location.back();
    console.log('toggle to details to details');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.searchItemString = data['item'];
      this.searchItem = JSON.parse(data['item']);
    });
    this.tabItems = this.tiservice.getTabItem();
    this.tabPaneItems = this.tpservice.getTabPanes();
  }
}
