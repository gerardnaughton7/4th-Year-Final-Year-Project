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

  displayName: any;
  email: any;
  photoURL: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, 
              private toast: ToastController, public googleplus: GooglePlus, public globalVar: globalVar) {
      
      this.email = navParams.get('param1'); 
      this.displayName = navParams.get('param2');
      this.photoURL = navParams.get('param3');

      if(this.email){
        globalVar.setLoginUser(this.email);
      };
  }

  ionViewWillLoad(){

    if(this.email){
      this.toast.create({
        message: "Welcome To Digs App " + this.email,
        duration: 3000     
      }).present();
    }
  }
  
  /*TODO *** Remove later - handy for debugging */
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
}
