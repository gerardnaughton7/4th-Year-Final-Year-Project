import { UpdateMyRoomAdPage } from './../update-my-room-ad/update-my-room-ad';
import { Storage } from '@ionic/storage';
import { RoomAd } from './../../providers/roomAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-my-room-ads',
  templateUrl: 'my-room-ads.html',
})
export class MyRoomAdsPage {

  rooms: any;
  email: any;
  navFrom: boolean = true;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private storage: Storage, private roomAd: RoomAd, private toast: ToastController) {

  }

  /**
   * Retrieve email from local storage. Retrieve list of My Room Ads from Back-end using Room Ad Service
   */
  ionViewDidEnter(){
    this.storage.get('email').then((val) => {
      
      this.email = val;

      this.roomAdService.getMyRooms(this.email).subscribe((data) => {
        //console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
        this.rooms = data; 
      },
      error => {
        this.toast.create({
          message: "Unable To Retrieve My Room Ads",
          duration: 3000     
        }).present();
      });
    });  
  }

  /**
   * Opens The Preview Room Page Modal passing through the current room and a boolean to its constructor
   * @param {object} room 
   * @param {boolean} navFrom set to true
   */
  openRoom(room, navFrom) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room, navFrom: this.navFrom });
    modal.present();

    modal.onDidDismiss(data => {
      this.roomAdService.getMyRooms(this.email).subscribe((data) => {
        console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
        this.rooms = data; 
      },
      error => {
        alert("ERROR Retrieving My Room Ads: " + error);
      });
    });
  }

  /**
   * Navigate to the Update My Room Page passing through the current room to be updated.
   * @param {object} room 
   */
  updateAd(room){
    this.navCtrl.push(UpdateMyRoomAdPage, {room: room});
  }

  /**
   * Delete Room from Database using Room Ad Service
   * @param {object} room 
   */
  deleteAd(room){
    try{
      this.roomAd.deleteRoom(room._id);
    }
    catch(e){
      console.log("Error deleting...: " + e);
    }
    let deleteTimeout = setTimeout( () => { this.navCtrl.setRoot(MyRoomAdsPage); }, 500); 
  }
}
