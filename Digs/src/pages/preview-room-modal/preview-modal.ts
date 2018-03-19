import { RoomAd } from './../../providers/roomAd';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-preview-modal',
  templateUrl: 'preview-modal.html',
})

export class PreviewModalPage {
  room: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private roomAd: RoomAd, private viewCtrl: ViewController, private launchNavigator: LaunchNavigator) {
    this.room = this.navParams.get('room');
  }
 
  close() {
    this.viewCtrl.dismiss();
  }

  findOnMap(){
    if(this.room.Eircode != null){
      this.launchNavigator.navigate(this.room.Eircode)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
    }
    else{
      alert("No Eircode Supplied!");
    }
  }

  deleteRoom(){
    this.roomAd.deleteRoom(this.room._id);
    this.viewCtrl.dismiss();
  }
}