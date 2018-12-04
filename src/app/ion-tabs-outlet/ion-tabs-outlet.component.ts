import { Attribute, Component, OnDestroy, OnInit, Output, EventEmitter, ViewContainerRef, Optional, ComponentFactoryResolver, ComponentRef, ChangeDetectorRef, ElementRef, NgZone, Injector, Input, ViewChild, HostListener } from '@angular/core';
import { ChildrenOutletContexts, Router, PRIMARY_OUTLET, OutletContext, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';


@Component({
  selector: 'ion-tabs-outlet',
  templateUrl: './ion-tabs-outlet.component.html',
  styleUrls: ['./ion-tabs-outlet.component.css']
})
export class IonTabsOutletComponent {
  private tabStacks: TabStack[] = [];

  constructor(
    private router: Router
  ) {}


  switchTab(tabPath: string) {

    this.router.navigate([tabPath]);
  }

  addTabStack(tabPath: string) {
    this.tabStacks.push({
      tabPath: tabPath,
      history: []
    });
  }

  removeTabStack(tabPath: string) {
    const index = this.tabStacks.findIndex(t => t.tabPath === tabPath);
    if (index > -1) {
      this.tabStacks.splice(index, 1);
    }
  }

}

interface TabStack {
  tabPath: string;
  history: TabHistory[]
}

interface TabHistory {
  url: string;
}