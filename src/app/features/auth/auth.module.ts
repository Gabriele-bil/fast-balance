import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthContainerComponent } from './components/auth-container.component';
import { SignupComponent } from './components/signup.component';
import { LoginComponent } from './components/login.component';
import { ForgotPasswordComponent } from './components/forgot-password.component';
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/modules/shared.module";


@NgModule({
  declarations: [
    AuthContainerComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthModule { }
