import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { HttpClientModule } from  '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB27AeewiLYQxizogZYbWZE1pWxU1RpesU",
  authDomain: "sui-dhaga-462f9.firebaseapp.com",
  projectId: "sui-dhaga-462f9",
  storageBucket: "sui-dhaga-462f9.appspot.com",
  messagingSenderId: "171253371676",
  appId: "1:171253371676:web:d86b399576ddcf6891a0d9",
  measurementId: "G-43XLWPPSVD"
};

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
