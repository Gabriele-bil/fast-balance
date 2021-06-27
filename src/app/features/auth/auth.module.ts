import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './components/auth-container.component';
import { SigninComponent } from './components/signin.component';
import { LoginComponent } from './components/login.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';


@NgModule({
  declarations: [
    AuthContainerComponent,
    SigninComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
