import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';
import { RoomAd } from './../../providers/roomAd';

@IonicPage()
@Component({
  selector: 'page-list-of-rooms',
  templateUrl: 'list-of-rooms.html',
})
export class ListOfRoomsPage {

  rooms: any;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, 
              public modalCtrl: ModalController) {
    
  }

  ionViewDidEnter() {
    this.roomAdService.getRooms().subscribe((data) => {
      console.log("Data returned from ListRooms on Load: " + JSON.stringify(data));
      this.rooms = data.reverse(); 
    },
    error => {
      alert("ERROR Retrieving Room Ads: " + error);
    });

  }

  openRoom(room) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room });
    modal.present();
  }

  doRefresh(refresher) {

    this.roomAdService.getRooms().subscribe(data => {
      this.rooms = data.reverse();
    },
    error => {
      alert("ERROR Retrieving Room Ads: " + error);
    });
    refresher.complete();
  }

  navToSearchPage(){
    this.navCtrl.push(SearchPage, {navFrom: true});
  }

}