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


@Component({
  selector: 'app-details-section',
  templateUrl: './details-section.component.html',
  styleUrls: ['./details-section.component.css']
})
export class DetailsSectionComponent implements OnInit {

  @Input() item: SearchItem;
  public itemDetails: any;
  constructor(private tpservice: TabPaneService, private tiservice: TabItemService, private userService: UserService) { }
  public tabPaneItems: TabPaneItem[];
  public tabItems: TabItem[];

  ngOnInit() {
    this.tabItems = this.tiservice.getTabItem();
    this.tabPaneItems = this.tpservice.getTabPanes();
  }
}
