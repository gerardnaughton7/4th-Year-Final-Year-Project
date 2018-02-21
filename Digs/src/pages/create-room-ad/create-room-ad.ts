import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the CreateRoomAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-room-ad',
  templateUrl: 'create-room-ad.html',
})
export class CreateRoomAdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  uploadImages() {
    
  }

  publishAd() {
    this.navCtrl.setRoot(HomePage);
  }

}
