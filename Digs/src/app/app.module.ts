import { RoomAd } from './../providers/roomAd';
import { ForgetPasswordPage } from './../pages/forget-password/forget-password';
import { RegisterPage } from './../pages/register/register';
import { FIREBASE_CONFIG } from './app.firebase.config';
import { CreateRoomAdPage } from './../pages/create-room-ad/create-room-ad';
import { CreatePropertyAdPage } from './../pages/create-property-ad/create-property-ad';
import { CreatePage } from './../pages/create/create';
import { ListOfRoomsPage } from './../pages/list-of-rooms/list-of-rooms';
import { ListOfPropertiesPage } from './../pages/list-of-properties/list-of-properties';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';

import firebase from 'firebase';

firebase.initializeApp(FIREBASE_CONFIG);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListOfRoomsPage,
    ListOfPropertiesPage,
    CreatePage,
    CreatePropertyAdPage,
    CreateRoomAdPage, 
    LoginPage,
    RegisterPage,
    ForgetPasswordPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListOfRoomsPage,
    ListOfPropertiesPage,
    CreatePage,
    CreatePropertyAdPage,
    CreateRoomAdPage,
    LoginPage,
    RegisterPage,
    ForgetPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    FileTransfer,
    RoomAd,
    GooglePlus
  ]
})
export class AppModule {}
