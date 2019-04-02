import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appTabs]'
})
export class TabsDirective {

  constructor(public vc: ViewContainerRef) { }

}
