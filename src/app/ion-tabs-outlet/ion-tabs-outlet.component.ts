import { Component, Injector, ViewContainerRef, Attribute, Optional, ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, ElementRef, NgZone, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { ChildrenOutletContexts, Router, PRIMARY_OUTLET, OutletContext, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { StackController, NavDirection } from './stack-controller';


@Component({
  selector: 'ion-tabs-outlet',
  templateUrl: './ion-tabs-outlet.component.html',
  styleUrls: ['./ion-tabs-outlet.component.css']
})
export class IonTabsOutletComponent {

  private activated: ComponentRef<any> | null = null;
  private activatedView: any | null = null;

  private _activatedRoute: ActivatedRoute | null = null;
  private _swipeGesture?: boolean;
  private name: string;
  private stackCtrl: StackController;
  private nativeEl: any;
  private hasStack = false;

  @Output('activate') activateEvents = new EventEmitter<any>();
  @Output('deactivate') deactivateEvents = new EventEmitter<any>();

  @Input()
  set animated(animated: boolean) {
    this.nativeEl.animated = animated;
  }

  @Input()
  set swipeGesture(swipe: boolean) {
    // this._swipeGesture = swipe;
    // this.nativeEl.swipeHandler = (swipe && this.hasStack) ? {
    //   canStart: () => this.stackCtrl.canGoBack(1),
    //   onStart: () => this.stackCtrl.startBackTransition(),
    //   onEnd: shouldContinue => this.stackCtrl.endBackTransition(shouldContinue)
    // } : undefined;
  }

  @ViewChild('viewOutlet', {read: ViewContainerRef}) viewOutlet: ViewContainerRef;

  constructor(
    private parentContexts: ChildrenOutletContexts,
    private resolver: ComponentFactoryResolver,
    @Attribute('name') name: string,
    @Optional() @Attribute('stack') stack: any,
    private changeDetector: ChangeDetectorRef,
    // private navCtrl: any,
    elementRef: ElementRef,
    private router: Router,
    zone: NgZone
  ) {
    this.nativeEl = elementRef.nativeElement;
    this.name = name || PRIMARY_OUTLET;
    parentContexts.onChildOutletCreated(this.name, this as any);
    this.hasStack = stack !== 'false' && stack !== false;
    // this.stackCtrl = new StackController(this.hasStack, this.nativeEl, router, null, zone);
  }

  ngOnDestroy(): void {
    console.log('router-outlet destroyed');
    this.parentContexts.onChildOutletDestroyed(this.name);
  }

  getContext(): OutletContext | null {
    return this.parentContexts.getContext(this.name);
  }

  ngOnInit(): void {
    if (!this.activated) {
      // If the outlet was not instantiated at the time the route got activated we need to populate
      // the outlet when it is initialized (ie inside a NgIf)
      const context = this.getContext();
      if (context && context.route) {
        this.activateWith(context.route, context.resolver || null);
      }
    }
    // this.nativeEl.componentOnReady().then(() => {
    //   if (this._swipeGesture === undefined) {
    //     this.swipeGesture = this.nativeEl.mode === 'ios';
    //   }
    // });
  }

  get isActivated(): boolean {
    return !!this.activated;
  }

  get component(): object {
    if (!this.activated) {
      throw new Error('Outlet is not activated');
    }
    return this.activated.instance;
  }

  get activatedRoute(): ActivatedRoute {
    if (!this.activated) {
      throw new Error('Outlet is not activated');
    }
    return this._activatedRoute as ActivatedRoute;
  }

  get activatedRouteData(): any {
    if (this._activatedRoute) {
      return this._activatedRoute.snapshot.data;
    }
    return {};
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to detach the subtree
   */
  detach(): ComponentRef<any> {
    throw new Error('incompatible reuse strategy');
  }

  /**
   * Called when the `RouteReuseStrategy` instructs to re-attach a previously detached subtree
   */
  attach(_ref: ComponentRef<any>, _activatedRoute: ActivatedRoute) {
    throw new Error('incompatible reuse strategy');
  }

  deactivate(): void {
    if (this.activated) {
      if (this.activatedView) {
        this.activatedView.savedData = new Map(this.getContext()!.children['contexts']);
      }
      const c = this.component;
      this.activatedView = null;
      this.activated = null;
      this._activatedRoute = null;
      this.deactivateEvents.emit(c);
    }
  }

  tabStacks = new Map<string, TabHistory[]>();
  selectTab(tabId: string) {
    const tabHistory = this.tabStacks.get(tabId);
    if (tabHistory) {
      this.router.navigateByUrl(tabHistory[tabHistory.length - 1].url);
    } else {
      this.router.navigateByUrl(tabId);
    }
  }

  activateWith(activatedRoute: ActivatedRoute, resolver: ComponentFactoryResolver | null) {
    if (this.isActivated) {
      throw new Error('Cannot activate an already activated outlet');
    }
    this._activatedRoute = activatedRoute;

    let cmpRef: any;
    let enteringView = this.stackCtrl.getExistingView(activatedRoute);
    if (enteringView) {
      cmpRef = this.activated = enteringView.ref;
      const saved = enteringView.savedData;
      if (saved) {
        // self-restore
        const context = this.getContext()!;
        context.children['contexts'] = saved;
      }
    } else {
      const snapshot = (activatedRoute as any)._futureSnapshot;
      const component = snapshot.routeConfig!.component as any;
      resolver = resolver || this.resolver;

      const factory = resolver.resolveComponentFactory(component);
      const childContexts = this.parentContexts.getOrCreateContext(this.name).children;

      const injector = new OutletInjector(activatedRoute, childContexts, this.viewOutlet.injector);

      cmpRef = this.activated = this.viewOutlet.createComponent(factory, this.viewOutlet.length, injector);

      // bindLifecycleEvents(cmpRef.instance, cmpRef.location.nativeElement);

      // Calling `markForCheck` to make sure we will run the change detection when the
      // `RouterOutlet` is inside a `ChangeDetectionStrategy.OnPush` component.
      this.changeDetector.markForCheck();
      // enteringView = this.stackCtrl.createView(this.activated, activatedRoute);
    }

    const direction: NavDirection = 'tabSwitch';
    const animated = false;

    this.activatedView = enteringView;
    this.stackCtrl.setActive(enteringView, direction, animated).then(() => {
      this.activateEvents.emit(cmpRef.instance);
      emitEvent(this.nativeEl);
    });
  }

  canGoBack(deep = 1) {
    return this.stackCtrl.canGoBack(deep);
  }

  pop(deep = 1) {
    return this.stackCtrl.pop(deep);
  }

  getLastUrl() {
    const active = this.stackCtrl.getActive();
    return active ? active.url : undefined;
  }

}

function emitEvent(el: HTMLElement) {
  const ev = new CustomEvent('ionRouterOutletActivated', {
    bubbles: true,
    cancelable: true,
  });
  el.dispatchEvent(ev);
}

class OutletInjector implements Injector {
  constructor(
    private route: ActivatedRoute,
    private childContexts: ChildrenOutletContexts,
    private parent: Injector
  ) {}

  get(token: any, notFoundValue?: any): any {
    if (token === ActivatedRoute) {
      return this.route;
    }

    if (token === ChildrenOutletContexts) {
      return this.childContexts;
    }

    // tslint:disable-next-line
    return this.parent.get(token, notFoundValue);
  }
}

interface View {
  ref: ComponentRef<any>;
  element: HTMLElement;
  url: string;
  savedData?: boolean;
}

interface TabHistory {
  url: string;
}