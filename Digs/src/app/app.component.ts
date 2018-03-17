import { globalVar } from './../providers/globalVar';

import { AngularFireAuth } from 'angularfire2/auth';
import { MyPropertyAdsPage } from './../pages/my-property-ads/my-property-ads';
import { MyRoomAdsPage } from './../pages/my-room-ads/my-room-ads';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { ListOfRoomsPage } from './../pages/list-of-rooms/list-of-rooms';
import { ListOfPropertiesPage } from './../pages/list-of-properties/list-of-properties';
import { CreatePage } from './../pages/create/create';
import { CreatePropertyAdPage } from './../pages/create-property-ad/create-property-ad';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, ToastController, AlertController } from 'ionic-angular';
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
  showAccount : any = false;
  email: string = '';
  googleUser: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
                private afAuth: AngularFireAuth, private toast: ToastController, private alertCtrl: AlertController, public globalVar: globalVar) {

    this.initializeApp();
         
    // Check to see if logged in with firebase
    this.afAuth.authState.subscribe(data => {
      if(data && data.uid){
        //this.email = data.email;
        this.email = globalVar.getLoginUser();
        this.showAccount = true;
      }       
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'List Of Rooms', component: ListOfRoomsPage, icon: 'list-box' },
      { title: 'List Of Properties', component: ListOfPropertiesPage, icon: 'list-box' },
      { title: 'Create Ad', component: CreatePage, icon: 'create' },
      { title: 'My Room Ads', component: MyRoomAdsPage, icon: 'list-box' },
      { title: 'My Property Ads', component: MyPropertyAdsPage, icon: 'list-box' },
      { title: 'Digs Message Board', component: MessageboardPage, icon: 'clipboard' },
      { title: 'Create New Message', component: CreatemessagePage, icon: 'create' }
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

  /***************** LOGOUT FUNCTIONALITY ********************************* */
  logout(){
    console.log("Logout");
    this.afAuth.auth.signOut();
    this.showAccount = false;
    this.nav.setRoot(LoginPage);
    this.email = this.globalVar.getLoginUser();

    let alert = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Successfully Logged Out ' + this.email,
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
 