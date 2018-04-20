import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-search-result-room',
  templateUrl: 'search-result-room.html',
})
export class SearchResultRoomPage {
  rooms: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
    this.rooms = navParams.get("data");
  }

  /**
   * Opens a Modal which Presents the room listing to the user
   * @param {object} room 
   */
  openRoom(room){
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room });
    modal.present();
  }

}
