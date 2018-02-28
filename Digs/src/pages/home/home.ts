import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,  
    private afAuth: AngularFireAuth, private toast: ToastController) {

  }

  ionViewWillLoad(){

    this.afAuth.authState.subscribe(data => {

      if(data && data.email && data.uid){
        this.toast.create({
          message: "Welcome To Digs App, " + data.email,
          duration: 3000     
        }).present();
      }
      else{
        this.toast.create({
          message: "Could Not Find Authentification Details",
          duration: 3000     
        }).present();
      }
    });
  }

}

