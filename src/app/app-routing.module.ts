import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const authModule = () => import('./features/auth/auth.module').then(a => a.AuthModule);
const dashboardModule = () => import('./features/dashboard/dashboard.module').then(d => d.DashboardModule);

const routes: Routes = [
  { path: '', loadChildren: authModule },
  { path: 'dashboard', loadChildren: dashboardModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
