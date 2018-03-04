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

  constructor(public navCtrl: NavController, public navParams: NavParams,  
    private afAuth: AngularFireAuth, private toast: ToastController, public googleplus: GooglePlus) {
      this.gLoggedIn = navParams.get('param1'); 
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
    });
  }
/* ******************************* LOGOUT FUNCTIONALITY *************************************************/
  logout(){
    console.log("Logout");
    if(this.loggedIn == true){
      
      this.afAuth.auth.signOut().then(() => {
        this.toast.create({
          message: "Successfully Logged Out User!",
          duration: 3000     
        }).present();
        this.loggedIn = false;
        this.navCtrl.setRoot(LoginPage);
      }).catch(e => {
        alert("Error Logging Out!: " + e);
      });    
    }
  }

  glogout(){
    
    this.googleplus.disconnect().then(
      (msg) => {
            if(firebase.auth().currentUser){
              firebase.auth().signOut();
              this.gLoggedIn = false;
              this.toast.create({
                message: "Successfully Logged Out Google!",
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

