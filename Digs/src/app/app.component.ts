import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { MyPropertyAdsPage } from './../pages/my-property-ads/my-property-ads';
import { MyRoomAdsPage } from './../pages/my-room-ads/my-room-ads';
import { LoginPage } from './../pages/login/login';
import { ListOfRoomsPage } from './../pages/list-of-rooms/list-of-rooms';
import { ListOfPropertiesPage } from './../pages/list-of-properties/list-of-properties';
import { CreatePage } from './../pages/create/create';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, AlertController, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MessageboardPage } from './../pages/messageboard/messageboard';
import { CreatemessagePage } from './../pages/createmessage/createmessage';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  showAccount : any = false;
  email: string = '';
  googleUser: any;
  counter = 0;

  pages: Array<{title: string, component: any, icon: string}>;
  loggedInPages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
                private afAuth: AngularFireAuth, private storage: Storage, private toast: ToastController, public menu: MenuController) {

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

    /**
     * Pages That Are Always Shown
     */
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'List Of Rooms', component: ListOfRoomsPage, icon: 'list-box' },
      { title: 'List Of Properties', component: ListOfPropertiesPage, icon: 'list-box' },
      { title: 'Digs Message Board', component: MessageboardPage, icon: 'chatboxes' }
    ];

    /**
     * Pages That are shown when a user is logged in
     */
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

      this.platform.registerBackButtonAction(() => {
        if(this.menu.isOpen()){
           this.menu.close()
        } 
        else if(this.nav.canGoBack()){
          console.log("Back...");
          this.nav.pop();
        }else{
          if(this.counter == 0){
            this.counter++;
            this.toast.create({
              message: "Press Back Again To Exit App",
              duration: 3000,
              cssClass: "toast"       
            }).present();
            setTimeout(() => { this.counter = 0 }, 3000)
          }
          else{
            this.platform.exitApp();
          }
        }
      });
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

      this.toast.create({
        message: "Successfully Logged Out " + this.email,
        duration: 3000     
      }).present();
    });

    this.storage.remove('email');
    this.storage.remove('displayName');
    this.storage.remove('photoURL');

    this.nav.setRoot(LoginPage);
  }

  login(){
    this.nav.push(LoginPage);
  }

  register(){
    this.nav.push(RegisterPage);
  }
}
 