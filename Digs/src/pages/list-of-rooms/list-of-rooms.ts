import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RoomAd } from './../../providers/roomAd';

@IonicPage()
@Component({
  selector: 'page-list-of-rooms',
  templateUrl: 'list-of-rooms.html',
})
export class ListOfRoomsPage {

  rooms: any;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidEnter() {
    this.roomAdService.getRooms().then((data) => {
      console.log("Data returned from ListRooms on Load: " + JSON.stringify(data));
      this.rooms = data; 
    });
  }

  openRoom(room) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room });
    modal.present();
  }
}