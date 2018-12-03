import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageOneComponent } from './page-one/page-one.component';
import { PageTabsComponent } from './page-tabs/page-tabs.component';

const routes: Routes = [
  {
    path: 'page-one',
    component: PageOneComponent
  },
  {
    path:
    'page-tabs/:id',
    component: PageTabsComponent
  },
  { path: '',
    redirectTo: '/page-one',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
