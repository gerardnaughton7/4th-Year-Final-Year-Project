import { ForgetPasswordPage } from './../forget-password/forget-password';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //Initialize a new User Object Here
  user = {} as User;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afAuth: AngularFireAuth, public googlePlus: GooglePlus, 
    public loadingController: LoadingController, public events : Events) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async login(user: User){

    let loading = this.loadingController.create({content : "Logging in, please wait..."});
    loading.present();
    try{         
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        this.events.publish('loggedin');
        this.navCtrl.setRoot(HomePage);
        loading.dismissAll();
      }     
    }
    catch(e){ 
      loading.dismiss(); 
      alert("Error Logging In: " + e);      
    }  
  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  resetPassword(){
    this.navCtrl.push(ForgetPasswordPage);
  }

  googleLogin(){
    this.googlePlus.login({
      'webClientId': '899080047110-r464tup6omrqfci8lce54nhtlm8j4gp0.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc => {
        console.log("Success Google");
        this.navCtrl.setRoot(HomePage, {
          param1: "true"
        })
      }).catch(err => {
        console.log("Google Login Failed!!")
        alert("Oops - Google Login Failed!");
      })
    });
  }
}
