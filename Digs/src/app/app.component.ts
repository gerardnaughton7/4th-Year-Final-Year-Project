import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { ListOfRoomsPage } from './../pages/list-of-rooms/list-of-rooms';
import { ListOfPropertiesPage } from './../pages/list-of-properties/list-of-properties';
import { CreatePage } from './../pages/create/create';
import { CreatePropertyAdPage } from './../pages/create-property-ad/create-property-ad';
import { CreateRoomAdPage } from './../pages/create-room-ad/create-room-ad';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessageboardPage } from './../pages/messageboard/messageboard';
import { CreatemessagePage } from './../pages/createmessage/createmessage';

import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List Of Rooms', component: ListOfRoomsPage },
      { title: 'List Of Properties', component: ListOfPropertiesPage },
      { title: 'Create Ad', component: CreatePage },
      { title: 'Message Board', component: MessageboardPage },
      { title: 'Create New Message', component: CreatemessagePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
