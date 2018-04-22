import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { matchingPasswords, emailValidator } from '../../validators/validators';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  validations_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, 
              public formBuilder: FormBuilder, private loadingController: LoadingController, private toast: ToastController) {
    
    /**
     * Validate The Form Using a FormBuilder
     */   
    this.validations_form = formBuilder.group({
      email: ['', Validators.compose([Validators.required,  emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'confirmPassword')})

  }

  /**
   * Register the User with Firebase 
   * @param {object} value 
   */
  async onSubmit(value: Object) {
    let loading = this.loadingController.create({content : "Registering, please wait..."});
    loading.present();    
    try{
      //Result object of creating a user with an email and password
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(value['email'], value['password']);
      this.toast.create({
        message: "Successfully Registered - Please Log In",
        duration: 3000,
        cssClass: "toast"   
      }).present();
      this.navCtrl.push(LoginPage);
      loading.dismissAll();
    }
    catch(e){
      console.error("Error Registering: " + e);
      loading.dismiss();
      this.toast.create({
        message: "Error Registering User - Please Try Again",
        duration: 3000,
        cssClass: "toast"   
      }).present();
      this.validations_form.reset();
    }
  }
}
