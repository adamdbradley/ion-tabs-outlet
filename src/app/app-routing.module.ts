import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGettingStartedComponent } from './page-getting-started/page-getting-started.component';
import { PageTabsComponent } from './page-tabs/page-tabs.component';
import { PageAccountComponent } from './page-account/page-account.component';
import { PageContactComponent } from './page-contact/page-contact.component';
import { PageSettingsComponent } from './page-settings/page-settings.component';
import { PageContactTwoComponent } from './page-contact-two/page-contact-two.component';
import { PageAccountDetailComponent } from './page-account-detail/page-account-detail.component';

const routes: Routes = [
  {
    path: '',
    component: PageGettingStartedComponent
  },
  {
    path: 'tabs',
    component: PageTabsComponent,
    children: [
      {
        path: 'account',
        children: [
          {
            path: ':id',
            component: PageAccountDetailComponent
          },
          {
            path: '',
            component: PageAccountComponent
          }
        ]
      },
      {
        path: 'contact',
        children: [
          {
            path: 'one',
            component: PageContactComponent
          },
          {
            path: 'two',
            component: PageContactTwoComponent
          },
          {
            path: '',
            redirectTo: 'one',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'settings',
        component: PageSettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
