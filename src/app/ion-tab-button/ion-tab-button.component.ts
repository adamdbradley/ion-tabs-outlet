import { Attribute, Component, OnInit, ViewEncapsulation, OnDestroy, Optional, HostBinding, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'ion-tab-button',
  templateUrl: './ion-tab-button.component.html',
  styleUrls: ['./ion-tab-button.component.css']
})
export class IonTabButtonComponent implements OnInit, OnDestroy {

  private _routeSub: any;

  @HostBinding('class.active') isActive: boolean = false;

  @HostListener('click')
  onClick() {
    console.log('clicked', this.tab);
  }

  constructor(
    @Optional() @Attribute('tab') private tab: string,
    private router: Router
  ) { }

  ngOnInit() {
    this._routeSub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.checkActive(ev.urlAfterRedirects);
      }
    });

    this.checkActive(this.router.url);
  }

  checkActive(currentUrl: string) {
    this.isActive = (this.tab === currentUrl || currentUrl.startsWith(this.tab + '/'));
  }

  ngOnDestroy() {
    this._routeSub && this._routeSub.unsubscribe();
  }

}
