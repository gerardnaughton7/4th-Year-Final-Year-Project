import { HomePage } from './../home/home';
import { PreviewModalPage } from './../preview-room-modal/preview-modal';
import { MyRoomAdsPage } from './../my-room-ads/my-room-ads';
import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomAd } from '../../providers/roomAd';

@IonicPage()
@Component({
  selector: 'page-update-my-room-ad',
  templateUrl: 'update-my-room-ad.html',
})
export class UpdateMyRoomAdPage {

  room: any;
 
  email: String;
  UID: String;
  AdID: any;
  RoomType: String;
  College: String[];
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
  ImageURL: String[];
  Date: Date;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser, 
              private roomAdService: RoomAd) {
    this.room = navParams.get('room');
    console.log("In Update Room, Price passed over: " + this.room.Price);
    this.RoomType = this.room.RoomType;
    this.College = this.room.College;
    this.Address = this.room.Address;
    this.Eircode = this.room.Eircode;
    this.LocationDes = this.room.LocationDes;
    this.Price = this.room.Price;
    this.Availability = this.room.Availability;
    this.email = this.room.Email;
    this.Phone = this.room.Phone;
    this.Contact = this.room.Contact;
    this.Description = this.room.Description;
    this.Parking = this.room.Parking;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateMyRoomAdPage');
  }

  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options); 
  }

  publishUpdate(){
    let updatedRoom = {
      UID: this.room.UID,
      AdID: this.room.AdID,
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
      Parking: this.Parking,
      ImageURL: this.room.ImagesUrl,
      Date: new Date()
    };
    this.roomAdService.updateRoom(updatedRoom, this.room._id);     
    this.navCtrl.pop();
  }

}
