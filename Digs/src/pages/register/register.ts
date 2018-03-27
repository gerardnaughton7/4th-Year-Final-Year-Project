import { User } from './../../models/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { matchingPasswords, emailValidator } from '../../validators/validators';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  validations_form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, 
              public formBuilder: FormBuilder, private loadingController: LoadingController) {
    
    this.validations_form = formBuilder.group({
      email: ['', Validators.compose([Validators.required,  emailValidator])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'confirmPassword')})

  }

  ionViewDidLoad() {

  }

  async onSubmit(value: Object) {
    let loading = this.loadingController.create({content : "Registering, please wait..."});
    loading.present();    
    try{
      //Result object of creating a user with an email and password
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(value['email'], value['password']);
      this.navCtrl.push(LoginPage);
      loading.dismissAll();
    }
    catch(e){
      console.error("Error Registering: " + e);
      loading.dismiss();
      alert("Error Registering: " + e);
      this.validations_form.reset();
    }
  }
}
