import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
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
              private toast: ToastController, public googleplus: GooglePlus, private storage: Storage) {
      
  }

  ionViewWillLoad(){

    this.storage.get('email').then((val) => {
      this.email = val;
    });
    this.storage.get('displayName').then((val) => {
      this.displayName = val;      
    });
    this.storage.get('photoURL').then((val) => {
      this.photoURL = val;
    });

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
