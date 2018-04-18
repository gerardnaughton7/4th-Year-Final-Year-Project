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

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
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

  /**
   * @constructor retrieves all rooms and properties so the total for each can be displayed.
   */
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private toast: ToastController, public googleplus: GooglePlus, private storage: Storage, 
              private propertyAdService: PropertyAd, private roomAdService: RoomAd) {
    
    // Retrieve list of properties            
    this.propertyAdService.getProperties().subscribe((data) => {
      this.properties = data;
    },
    error => {
      
    });

    // Retrieve list of rooms
    this.roomAdService.getRooms().subscribe((data) => {
      this.rooms = data; 
    },
    error => {
      
    });
  }

  ionViewWillLoad(){
    // Load email, display name and photo url from local storage
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    this.storage.get('displayName').then((val) => {
      this.displayName = val;      
    });
    this.storage.get('photoURL').then((val) => {
      this.photoURL = val;
    });
  }

  /**
   * Navigate to Login Page
   */
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

  /**
   * Navigate to Register Page
   */
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }

  /**
   * Navigate to List if Rooms Page
   */
  goToRooms(){
    this.navCtrl.push(ListOfRoomsPage);
  }

  /**
   * Navigate to List OF Properties Page
   */
  goToProperties(){
    this.navCtrl.push(ListOfPropertiesPage);
  }
}
