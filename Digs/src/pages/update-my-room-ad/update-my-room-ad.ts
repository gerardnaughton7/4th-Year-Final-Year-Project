import { InAppBrowser, InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomAd } from '../../providers/roomAd';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
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
    /**
     * Retrieve The Room listing passed to this constructor
     */
    this.room = navParams.get('room');
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

  /**
   * Opens the in app browser and displays the eircode finder website.
   */
  moreInfo(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    // Opening a URL and returning an InAppBrowserObject
    const browser = this.inAppBrowser.create("https://finder.eircode.ie/#/", '_self', options); 
  }

  /**
   * Publishes the updated listing using the Room Ad Service
   */
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
    // Use the room ad service to publish the updated listing to the back-end
    this.roomAdService.updateRoom(updatedRoom, this.room._id);     
    this.navCtrl.pop();
  }
}
