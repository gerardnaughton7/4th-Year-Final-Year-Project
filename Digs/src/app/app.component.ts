import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyPropertyAdsPage } from './../pages/my-property-ads/my-property-ads';
import { MyRoomAdsPage } from './../pages/my-room-ads/my-room-ads';
import { LoginPage } from './../pages/login/login';
import { ListOfRoomsPage } from './../pages/list-of-rooms/list-of-rooms';
import { ListOfPropertiesPage } from './../pages/list-of-properties/list-of-properties';
import { CreatePage } from './../pages/create/create';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController } from 'ionic-angular';
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

  rootPage: any;
  showAccount : any = false;
  email: string = '';
  googleUser: any;

  pages: Array<{title: string, component: any, icon: string}>;
  loggedInPages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
                private afAuth: AngularFireAuth, private alertCtrl: AlertController, private storage: Storage) {

    this.initializeApp();
         
    // Check to see if logged in with firebase
    this.afAuth.authState.subscribe(data => {
      if(data && data.uid){
        this.storage.get('email').then((val) => {
          this.email = val;
          this.rootPage = HomePage;
        });
        this.showAccount = true;
      }
      else{
        this.rootPage = LoginPage;
      }       
    },error => {
      this.rootPage = LoginPage;
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'List Of Rooms', component: ListOfRoomsPage, icon: 'list-box' },
      { title: 'List Of Properties', component: ListOfPropertiesPage, icon: 'list-box' },
      //{ title: 'Create Ad', component: CreatePage, icon: 'create' },
      //{ title: 'My Room Ads', component: MyRoomAdsPage, icon: 'list-box' },
     // { title: 'My Property Ads', component: MyPropertyAdsPage, icon: 'list-box' },
      { title: 'Digs Message Board', component: MessageboardPage, icon: 'chatboxes' },
      //{ title: 'Create New Message', component: CreatemessagePage, icon: 'create' }
    ];

    this.loggedInPages = [
      { title: 'Create Ad', component: CreatePage, icon: 'create' },
      { title: 'My Room Ads', component: MyRoomAdsPage, icon: 'list-box' },
      { title: 'My Property Ads', component: MyPropertyAdsPage, icon: 'list-box' },
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
    this.afAuth.auth.signOut();
    this.showAccount = false;
    

    this.storage.get('email').then((val) => {
      this.email = val;
      console.log("Logging Out!!!: " + this.email);
    });
    
    this.storage.remove('email');
    this.storage.remove('displayName');
    this.storage.remove('photoURL');
    let alert = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Successfully Logged Out ' + this.email,
      buttons: ['Dismiss']
    });
    alert.present();

    this.nav.setRoot(LoginPage);
  }
}
 