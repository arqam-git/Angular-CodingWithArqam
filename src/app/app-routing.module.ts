import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Child1Component } from './child1/child1.component';
import { LoginComponent } from './login/login.component';
import { RxjsCompComponent } from './rxjs-comp/rxjs-comp.component';
import { UserFormComponent } from './user-form/user-form.component';

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
  {
    path: 'rxjs',
    component: RxjsCompComponent,
  },
  {
    path: 'user-form',
    component: UserFormComponent,
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
