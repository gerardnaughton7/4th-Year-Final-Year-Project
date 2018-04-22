import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  // Create a new User Object
  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth, private toastCtrl: ToastController) {
  }

  /**
   * Reset the Users password by passing the users email to the Firebase API 
   * which will handle the password reset.
   * @param {Object} user
   */
  resetPassword(user){
    return this.afAuth.auth.sendPasswordResetEmail(user.email).then(suc => {
      let toast = this.toastCtrl.create({
        message: 'Success - Check your email for instructions.',
        duration: 3000,
        position: 'bottom',
        cssClass: "toast"
      });
      toast.present();
      this.navCtrl.push(LoginPage);
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: 'Password Reset Failed, Please try again',
        duration: 3000,
        position: 'bottom',
        cssClass: "toast"
      });
      toast.present();
    })
  }
}
 