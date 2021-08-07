import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthContainerComponent } from "./components/auth-container.component";
import { LoginComponent } from "./components/login.component";
import { SignupComponent } from "./components/signup.component";
import { ForgotPasswordComponent } from "./components/forgot-password.component";

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  {
    path: '', component: AuthContainerComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
