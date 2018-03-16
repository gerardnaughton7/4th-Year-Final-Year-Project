import { globalVar } from './../../providers/globalVar';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loggedIn: boolean = false;
  gLoggedIn: boolean = false;

  email: string = '';
  userProfile: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,  
    private afAuth: AngularFireAuth, private toast: ToastController, public googleplus: GooglePlus, public globalVar: globalVar) {
      this.gLoggedIn = navParams.get('param1'); 

      firebase.auth().onAuthStateChanged(user => {
        if (user){
          this.userProfile = user;
          globalVar.setLoginUser(user.email);
        } else { 
          this.userProfile = null; 
        }
      });
  }

  ionViewWillLoad(){

    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.loggedIn = true;
        this.email = data.email;
        this.toast.create({
          message: "Welcome To Digs App, " + data.email,
          duration: 3000     
        }).present();
      }
    });
  }
  /*TODO *** Remove later - handy for debugging */
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
/* ******************************* LOGOUT FUNCTIONALITY *************************************************/
  glogout(){
    
    this.googleplus.disconnect().then(
      (msg) => {
            if(firebase.auth().currentUser){
              firebase.auth().signOut();
              this.gLoggedIn = false;
              this.toast.create({
                message: "Successfully Logged Out, " + firebase.auth().currentUser.displayName,
                duration: 3000     
              }).present();

              return this.navCtrl.setRoot(LoginPage); 
            }
      }).catch(
      (msg) => {
          alert('logout error: '+ msg);
      });
    
  }
/********************************************************************************************************/
}

