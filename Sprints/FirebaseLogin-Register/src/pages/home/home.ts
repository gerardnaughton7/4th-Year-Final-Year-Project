import { User } from './../../models/user';
import { GooglePlus } from '@ionic-native/google-plus';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import firebase from 'firebase';
// User Auth
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  userData = null;
  floggedIn: boolean = false;
  gloggedIn: boolean = false;
  token = 0;

  // Initialise New User
  user = {} as User;

  constructor(private afAuth: AngularFireAuth, public navCtrl: NavController, public facebook:Facebook, public googleplus:GooglePlus) {

  }

  // ============= User Login And Registration ====================================
  async login(user: User){
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      
      console.log("Result is: " + JSON.stringify(result));
      alert("Successful Login");
      return this.navCtrl.popToRoot();
    } catch (error) {
      console.log("Error Loggin Into Firebase Auth: " + JSON.stringify(error));
      alert("UN-Successful Login");
      return this.navCtrl.popToRoot();
    } 
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

  // =============== FACEBOOK AND GOOGLE Login ======================================

  fblogin(){    
    this.facebook.login(['email']).then((res) => {
      
      this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
      }).catch(err =>{
        alert("Error Getting FB API");
      })

      const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

      firebase.auth().signInWithCredential(fc).then(fs => {
        alert("Firebase Login Success!");
        this.floggedIn = true;
        this.gloggedIn = true;
        this.token = 1; //fb logged in
      }).catch(fberr => {
        alert("Firebase Error: " + JSON.stringify(fberr));
      })
    }).catch(err => {
      alert("Facebook Login Error: " + JSON.stringify(err));
    })
  }//fblogin

  gLogin(){
    
    this.googleplus.login({
      'webClientId': '899080047110-r464tup6omrqfci8lce54nhtlm8j4gp0.apps.googleusercontent.com',
      'offline': true
    }).then(res => {
      // Store the Id Token
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken)).then(suc => {
        this.gloggedIn = true;
        this.floggedIn = true;
        this.token = 2;
        alert("Google Login Success!");
        
      }).catch(err => {
        alert("Google Login Failed!");
      })
    })


  }//gLogin

  fblogout() {
    this.facebook.getLoginStatus().then( data=>{
        if (data.status =='connected'){
          this.facebook.logout();
          alert("Sucessfully Logged Out");         
        }
      }
    )
    this.floggedIn = false;
    this.gloggedIn = false;
    this.token = 0;
    return this.navCtrl.popToRoot();
  }

  glogout(){
   
    this.googleplus.disconnect().then(
      (msg) => {
            if(firebase.auth().currentUser){
              firebase.auth().signOut();
              this.gloggedIn = false;
              this.floggedIn = false;
              this.token = 0;
              alert("Sucessfully Logged Out"); 
              return this.navCtrl.popToRoot(); 
            }
      }).catch(
      (msg) => {
          alert('logout error: '+ msg);
      })
  }  
}
