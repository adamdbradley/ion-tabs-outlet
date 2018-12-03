import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGettingStartedComponent } from './page-getting-started/page-getting-started.component';
import { PageTabsComponent } from './page-tabs/page-tabs.component';
import { PageAccountComponent } from './page-account/page-account.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';

const routes: Routes = [
  {
    path: 'getting-started',
    component: PageGettingStartedComponent
  },
  {
    path: 'tabs',
    component: PageTabsComponent,
    children: [
      {
        path: 'account',
        component: PageAccountComponent
      },
      {
        path: 'contact',
        component: PageContactComponent
      },
      {
        path: 'settings',
        component: PageSettingsComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: '/getting-started',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
