import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@environments//environment.prod';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SpinnerComponent } from '@shared/components/spinner.component';
import { SharedModule } from '@shared/modules/shared.module';
import localeIt from '@angular/common/locales/it';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeIt);

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    SharedModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "it-IT" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
