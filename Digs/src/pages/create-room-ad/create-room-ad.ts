import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {RoomAd} from '../../providers/roomAd';
/**
 * Generated class for the CreateRoomAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-room-ad',
  templateUrl: 'create-room-ad.html',
})
export class CreateRoomAdPage {

  UID: String;
  AdID: String;
  RoomType: String;
  College: String;
  Address: String;
  Eircode: String;
  LocationDes: String;
  Price: any;
  Availability: any;
  Email: String;
  Phone: any;
  Contact: String;
  Description: String;
  Parking: String;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  publishAd() {

    let room = {
      UID: this.UID,
      AdID: this.AdID,
      RoomType: this.RoomType,
      College: this.College,
      Address: this.Address,
      Eircode: this.Eircode,
      LocationDes: this.LocationDes,
      Price: this.Price,
      Availability: this.Availability,
      Email: this.Email,
      Phone: this.Phone,
      Contact: this.Contact,
      Description: this.Description,
      Parking: this.Parking
    };
    this.roomAdService.createRoom(room);  
    this.navCtrl.setRoot(HomePage);
  }

  uploadImage() {

  }
  
}