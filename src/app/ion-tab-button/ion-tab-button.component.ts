import { Attribute, Component, OnInit, ViewEncapsulation, OnDestroy, Optional, HostBinding, HostListener, EventEmitter, Output, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { IonTabsOutletComponent } from '../ion-tabs-outlet/ion-tabs-outlet.component';


@Component({
  selector: 'ion-tab-button',
  templateUrl: './ion-tab-button.component.html',
  styleUrls: ['./ion-tab-button.component.css']
})
export class IonTabButtonComponent implements OnInit, OnDestroy {

  private _routeSub: any;

  constructor(
    @Optional() @Attribute('tab') private tab: string,
    private router: Router,
    private tabs: IonTabsOutletComponent
  ) { }

  @HostBinding('class.active') isActive: boolean = false;

  @HostListener('click', ['$event'])
  onClick(clickEv: UIEvent) {
    // simulating ionTabButtonClick from web component
    clickEv.preventDefault();
    clickEv.stopPropagation();

    this.tabs.switchTab(this.tab);
  }

  ngOnInit() {
    this._routeSub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.checkActive(ev.urlAfterRedirects);
      }
    });

    this.checkActive(this.router.url);

    this.tabs.addTabStack(this.tab)
  }

  checkActive(currentUrl: string) {
    this.isActive = (this.tab === currentUrl || currentUrl.startsWith(this.tab + '/'));
  }

  ngOnDestroy() {
    this._routeSub && this._routeSub.unsubscribe();
    this.tabs.removeTabStack(this.tab)
  }

}
