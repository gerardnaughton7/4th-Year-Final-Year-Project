import { globalVar } from './../../providers/globalVar';
import { ForgetPasswordPage } from './../forget-password/forget-password';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  displayName: any;
  email: any;
  photoURL: any;

  //Initialize a new User Object Here
  user = {} as User;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private afAuth: AngularFireAuth, public googlePlus: GooglePlus, 
    public loadingController: LoadingController, public globalVar: globalVar) {

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
        this.globalVar.setLoginUser(user.email);
        this.navCtrl.setRoot(HomePage, {
          param1: user.email,      
        });
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

  googleLogin(): void {
    this.googlePlus.login({
      'webClientId': '899080047110-r464tup6omrqfci8lce54nhtlm8j4gp0.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken, res.accessToken);
      
      firebase.auth().signInWithCredential(googleCredential).then( response => {
        //alert("Firebase success With Google: " + JSON.stringify(response));
        //alert(JSON.stringify(res));
        this.email = res.email;
        this.displayName = res.displayName;
        this.photoURL = res.imageUrl;

        this.navCtrl.setRoot(HomePage, {
          param1: this.email,
          param2: this.displayName,
          param3: this.photoURL
        });
      });
    }, err => {
        console.error("Error: ", err)
    });
  }

  // googleLogin(){
    
  //   this.googlePlus.login({
  //     'webClientId': '899080047110-r464tup6omrqfci8lce54nhtlm8j4gp0.apps.googleusercontent.com',
  //     'offline': true
  //   }).then(res => {
  //     firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc => {
  //       console.log("Success Google");
  //       this.navCtrl.setRoot(HomePage, {
  //         param1: "true"
  //       })
  //     }).catch(err => {
  //       console.log("Google Login Failed!!")
  //       alert("Oops - Google Login Failed!");
  //     })
  //   });
  // }
}
