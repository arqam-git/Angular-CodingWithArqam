import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Child1Component } from './child1/child1.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    // component: AppComponent, // If we load component on empty path as doing below, this will load the app component twice.
    redirectTo: '/',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'child1',
    component: Child1Component,
  },
  // Lazy Loading
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
