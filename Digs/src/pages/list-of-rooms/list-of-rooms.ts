import { SearchPage } from './../search/search';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { RoomAd } from './../../providers/roomAd';
import { isType } from '@angular/core/src/type';

/**
 * @author Patrick Moran, Gerard Naughton, Andrei Petruk
 */
@IonicPage()
@Component({
  selector: 'page-list-of-rooms',
  templateUrl: 'list-of-rooms.html',
})
export class ListOfRoomsPage {

  rooms: any;

  constructor(public navCtrl: NavController,public roomAdService: RoomAd, public navParams: NavParams, 
              public modalCtrl: ModalController, private loadingController: LoadingController, private toast: ToastController) {
    
  }

  /**
   * Retrieve a list of all Rooms.
   */
  ionViewDidEnter() {
    let loading = this.loadingController.create({content : "Retrieving Rooms, please wait..."});
    loading.present();
    this.roomAdService.getRooms().subscribe((data) => {
      console.log("Data returned from ListRooms on Load: " + JSON.stringify(data));
      this.rooms = data.reverse(); 
      loading.dismissAll();
    },
    error => {
      loading.dismiss();
      this.toast.create({
        message: "Unable To Retrieve Rooms at this Time",
        duration: 3000     
      }).present();
    });
  }

  /**
   * Opens a modal which presents the room to the user.
   * @param {object} room 
   */
  openRoom(room) {
    let modal = this.modalCtrl.create('PreviewModalPage', { room: room });
    modal.present();
  }

  /**
   * Pull down refresh which retrieves the list of rooms.
   * @param {Event} refresher 
   */
  doRefresh(refresher) {
    let loading = this.loadingController.create({content : "Retrieving Rooms, please wait..."});
    loading.present();
    this.roomAdService.getRooms().subscribe(data => {
      this.rooms = data.reverse();
      loading.dismissAll();
    },
    error => {
      loading.dismiss();
      alert("ERROR Retrieving Room Ads: " + error);
    });
    refresher.complete();
  }

  /**
   * Navigate To The Search Page.
   */
  navToSearchPage(){
    this.navCtrl.push(SearchPage, {navFrom: true});
  }

}