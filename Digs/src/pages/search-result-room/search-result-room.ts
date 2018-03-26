import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-result-room',
  templateUrl: 'search-result-room.html',
})
export class SearchResultRoomPage {
  rooms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.rooms = navParams.get("data");
    console.log(JSON.stringify(this.rooms));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultRoomPage');
  }

  openRoom(room){
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room });
    modal.present();
  }

}
