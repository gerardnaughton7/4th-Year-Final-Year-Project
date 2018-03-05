import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  resetPassword(user){
    return this.afAuth.auth.sendPasswordResetEmail(user.email).then(suc => {
      alert("Success - Please Check your email");
      this.navCtrl.push(LoginPage);
    }).catch(err => {
      alert("Password Reset Failed, Check the email Entered");
    })
  }
}
 