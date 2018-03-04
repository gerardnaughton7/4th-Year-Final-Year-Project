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

  constructor(public navCtrl: NavController, public navParams: NavParams,  
    private afAuth: AngularFireAuth, private toast: ToastController, public googleplus: GooglePlus) {

  }

  ionViewWillLoad(){

    this.afAuth.authState.subscribe(data => {

      if(data && data.email && data.uid){
        this.loggedIn = true;
        this.toast.create({
          message: "Welcome To Digs App, " + data.email,
          duration: 3000     
        }).present();
      }
      else{
        this.loggedIn = false;
        this.toast.create({
          message: "Could Not Find Authentification Details",
          duration: 3000     
        }).present();
      }
    });
  }

  logout(){
    console.log("Logout");
    if(this.loggedIn == true){
      
      this.afAuth.auth.signOut().then(() => {
        console.log("logging out...");
        this.navCtrl.setRoot(LoginPage);
      }).catch(e => {
        alert("Error Logging Out!");
      });    
    }
  }

  // glogout(){
   
  //   this.googleplus.disconnect().then(
  //     (msg) => {
  //           if(firebase.auth().currentUser){
  //             firebase.auth().signOut();

  //             alert("Sucessfully Logged Out"); 
  //             return this.navCtrl.setRoot(LoginPage); 
  //           }
  //     }).catch(
  //     (msg) => {
  //         alert('logout error: '+ msg);
  //     })
  // }

}

