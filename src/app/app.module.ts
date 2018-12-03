import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageGettingStartedComponent } from './page-getting-started/page-getting-started.component';
import { PageTabsComponent } from './page-tabs/page-tabs.component';
import { IonTabsOutletComponent } from './ion-tabs-outlet/ion-tabs-outlet.component';
import { IonTabBarComponent } from './ion-tab-bar/ion-tab-bar.component';
import { IonTabButtonComponent } from './ion-tab-button/ion-tab-button.component';
import { PageAccountComponent } from './page-account/page-account.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    PageGettingStartedComponent,
    PageTabsComponent,
    IonTabsOutletComponent,
    IonTabBarComponent,
    IonTabButtonComponent,
    PageAccountComponent,
    PageContactComponent,
    PageSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
