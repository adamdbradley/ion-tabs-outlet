import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTabsComponent } from './page-tabs/page-tabs.component';
import { IonTabsOutletComponent } from './ion-tabs-outlet/ion-tabs-outlet.component';
import { IonTabBarComponent } from './ion-tab-bar/ion-tab-bar.component';
import { IonTabButtonComponent } from './ion-tab-button/ion-tab-button.component';

@NgModule({
  declarations: [
    AppComponent,
    PageOneComponent,
    PageTabsComponent,
    IonTabsOutletComponent,
    IonTabBarComponent,
    IonTabButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
