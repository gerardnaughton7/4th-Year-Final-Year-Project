import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';

import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

// For User email and password auth
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from "angularfire2/auth";

//Initialise Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCKLCNYpY8zK1jXpI7ACWaXncEc6TJlcpQ",
  authDomain: "ionic-firebase-storage-6c5f2.firebaseapp.com",
  databaseURL: "https://ionic-firebase-storage-6c5f2.firebaseio.com",
  projectId: "ionic-firebase-storage-6c5f2",
  storageBucket: "ionic-firebase-storage-6c5f2.appspot.com",
  messagingSenderId: "899080047110"
}

// Initialse app with firbase config file
firebase.initializeApp(firebaseConfig)

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FIREBASE_CONFIG } from './app.firebase.config';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
