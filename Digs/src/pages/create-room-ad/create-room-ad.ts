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

  private UID: String;
  private AdID: String;
  private RoomType: String;
  private College: String;
  private Eircode: String;
  private LocationDes: String;
  private Price: any;
  private Availability: any;
  private Email: String;

  public newAd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  uploadImages() {
    
  }

  publishAd() {
    this.navCtrl.setRoot(HomePage);
  }

}
