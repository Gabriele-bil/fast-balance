import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const authModule = () => import('./features/auth/auth.module').then(a => a.AuthModule);

const routes: Routes = [
  { path: '', loadChildren: authModule },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
