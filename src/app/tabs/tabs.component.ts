import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';

import {TabPaneItem} from './tab-pane';
import {TabItem} from './tab-item';

import {TabsDirective} from './tabs.directive';
import {TabItemService} from './tab-item-service';
import {TabPaneService} from './tab-pane-service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  @Input() tabItems: TabItem[];
  @Input() tabPanes: TabPaneItem[];

  @ViewChild(TabsDirective) tab: TabsDirective;
  constructor(public componentFactoryResolver: ComponentFactoryResolver) { }

  public onTabClicked(tabItem: TabItem): void {
    this.setActiveTabItem(tabItem);
  }

  public setActiveTabItem(tabItem: TabItem): void {
    this.tabItems.forEach((value: TabItem, index: number) => {
      value.isSelected = false;
    });

    tabItem.isSelected = true;

    this.loadTab(this.tabItems.indexOf(tabItem));
  }

  public loadTab(index: number): void {
    const tabPaneItem = this.tabPanes[index];
    const fact = this.componentFactoryResolver.resolveComponentFactory(tabPaneItem.component);
    const tabPaneRef = this.tab.vc;
    tabPaneRef.clear();
    tabPaneRef.createComponent(fact);
  }

  ngOnInit() {
    this.loadTab(0);
  }
}
