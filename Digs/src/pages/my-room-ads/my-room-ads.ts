import { RoomAd } from './../../providers/roomAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
/**
 * Generated class for the MyRoomAdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-room-ads',
  templateUrl: 'my-room-ads.html',
})
export class MyRoomAdsPage {

  rooms: any;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.roomAdService.getMyRooms().then((data) => {
      console.log("Data returned from MyRooms on Load: " + JSON.stringify(data));
      this.rooms = data; 
    });
  }

  openRoom(room) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room });
    modal.present();
  }
}
