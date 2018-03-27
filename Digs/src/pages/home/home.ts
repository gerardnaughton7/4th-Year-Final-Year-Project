import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { RoomAd } from './../../providers/roomAd';
import { ListOfRoomsPage } from './../list-of-rooms/list-of-rooms';
import { ListOfPropertiesPage } from './../list-of-properties/list-of-properties';
import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayName: any;
  email: any;
  photoURL: any;
  properties: any;
  rooms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private toast: ToastController, public googleplus: GooglePlus, private storage: Storage, 
              private propertyAdService: PropertyAd, private roomAdService: RoomAd) {
    
    this.propertyAdService.getProperties().subscribe((data) => {
      this.properties = data;
    },
    error => {
      console.log("ERROR Retrieving Property Ads: " + error);
    });

    this.roomAdService.getRooms().subscribe((data) => {
      console.log("Data returned from ListRooms on Load: " + JSON.stringify(data));
      this.rooms = data.reverse(); 
    },
    error => {
      alert("ERROR Retrieving Room Ads: " + error);
    });
  }

  ionViewWillLoad(){

    this.storage.get('email').then((val) => {
      this.email = val;
    });
    this.storage.get('displayName').then((val) => {
      this.displayName = val;      
    });
    this.storage.get('photoURL').then((val) => {
      this.photoURL = val;
    });

    if(this.email){
      this.toast.create({
        message: "Welcome To Digs App " + this.email,
        duration: 3000     
      }).present();
    }
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

  goToRooms(){
    this.navCtrl.push(ListOfRoomsPage);
  }

  goToProperties(){
    this.navCtrl.push(ListOfPropertiesPage);
  }
}
