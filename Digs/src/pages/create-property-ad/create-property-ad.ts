import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the CreatePropertyAdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-property-ad',
  templateUrl: 'create-property-ad.html',
})
export class CreatePropertyAdPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePropertyAdPage');
  }

  uploadImages() {
    
  }

  publishAd() {
    this.navCtrl.setRoot(HomePage);
  }

}
