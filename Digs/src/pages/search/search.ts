import { ListOfPropertiesPage } from './../list-of-properties/list-of-properties';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  College: String;
  NoOfRooms: Number;
  RoomType: String;
  Parking: String;
  navFrom: Boolean;
  Price: Number;
  isFilled: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.navFrom = navParams.get("navFrom");
    console.log("in search cons"+ navParams.get('navFrom'));
  }

  ionViewDidEnter(){
   this.navFrom = this.navParams.get("navFrom");
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  SearchAds(){
    this.navCtrl.setRoot(ListOfPropertiesPage);
  }
}
