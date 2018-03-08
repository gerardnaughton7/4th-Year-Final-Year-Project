import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { matchingPasswords, emailValidator } from '../../validators/validators';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  validations_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, public formBuilder: FormBuilder) {
    
    this.validations_form = formBuilder.group({
      email: ['', Validators.compose([Validators.required,  emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'confirmPassword')})

  }

  ionViewDidLoad() {

  }

  async onSubmit(value: Object) {
    //this.real_password = value[0].password;
    console.log("Email is: " + value['email']);
    console.log("Password is: " + value['password']);
    console.log("Confirm Password is: " + value['confirmPassword']);
    
    try{
      //Result object of creating a user with an email and password
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(value['email'], value['password']);
      this.navCtrl.push(LoginPage);
      console.log(result);
    }
    catch(e){
      console.error("Error Registering: " + e);
      alert("Error Registering: " + e);
      this.validations_form.reset();
    }
  }
}
