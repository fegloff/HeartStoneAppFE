import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './shared/firebase/fcm.service';
import { ToastService } from './shared/toast.service';

/*
 * Taking from Firebase proyect page. 
 * Changed var to const and config to firebaseConfig
 */
const firebaseConfig = {
    apiKey: "AIzaSyCFpDpUyHa5tWS4pFvpbBFFeg1Yf9Dov58",
    authDomain: "heartstone-udemyionic.firebaseapp.com",
    databaseURL: "https://heartstone-udemyionic.firebaseio.com",
    projectId: "heartstone-udemyionic",
    storageBucket: "heartstone-udemyionic.appspot.com",
    messagingSenderId: "948654109221"
};


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    FcmService,
    ToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
