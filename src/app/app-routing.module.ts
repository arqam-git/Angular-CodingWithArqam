import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
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
