import { ForgetPasswordPage } from './../forget-password/forget-password';
import { RegisterPage } from './../register/register';
import { HomePage } from './../home/home';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  displayName: any;
  email: any;
  photoURL: any;
  user = {} as User;

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController,
                private afAuth: AngularFireAuth, public googlePlus: GooglePlus, private toast: ToastController,
                public loadingController: LoadingController, private storage: Storage) {
  }

  /**
   * Toggles the password view on or off
   */
  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /**
   * Login to Firebase with email and password 
   * @param {object} user 
   */
  async login(user: User){

    let loading = this.loadingController.create({content : "Logging in, please wait..."});
    loading.present();

    try{    
      // Authenticate the user with firebase and await result object.     
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if(result){
        // Store email in local storage
        this.storage.set('email', user.email);
        this.toast.create({
         message: "Welcome To Digs App " + user.email,
         duration: 3000,
         cssClass: "toast"    
       }).present();
       // Navigate to HomePage
        this.navCtrl.setRoot(HomePage);
        loading.dismissAll();
      }     
    }
    catch(e){ 
      loading.dismiss(); 
      this.toast.create({
        message: "Invalid Login - Please Try Again",
        duration: 3000,
        cssClass: "toast" 
      }).present();
    }  
  }

  /**
   * Login to Firebase With Google Plus
   */
  googleLogin(): void {
    // Login to Google API using key
    this.googlePlus.login({
      'webClientId': '899080047110-r464tup6omrqfci8lce54nhtlm8j4gp0.apps.googleusercontent.com',
      'offline': true
    }).then( res => {
      const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken, res.accessToken);
      // When Successful - Login To Firebase
      firebase.auth().signInWithCredential(googleCredential).then( response => {

        // Save email, display name and image url into local storage
        this.storage.set('email', res.email);
        this.storage.set('displayName', res.displayName);
        this.storage.set('photoURL', res.imageUrl);

        this.toast.create({
          message: "Welcome To Digs App " + res.email,
          duration: 3000,
          cssClass: "toast"     
        }).present();
        this.navCtrl.setRoot(HomePage);
      }, err => {
        this.toast.create({
          message: "Unable to Login with Google-plus - Please try again",
          duration: 3000,
          cssClass: "toast"   
        }).present();
      });
    }, err => {

    });
  }
   
  /**
   * Navigate to the Register Page
   */
  register(){
    this.navCtrl.push(RegisterPage);
  }

  /**
   * Navigate to the Forgot Password Page
   */
  resetPassword(){
    this.navCtrl.push(ForgetPasswordPage);
  }
}
