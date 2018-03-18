import { PropertyAd } from './../../providers/propertyAd';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
/**
 * Generated class for the MyPropertyAdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-property-ads',
  templateUrl: 'my-property-ads.html',
})
export class MyPropertyAdsPage {
  properties: any;

  constructor(public navCtrl: NavController,public propertyAdService: PropertyAd, public navParams: NavParams, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.propertyAdService.getMyProperties().subscribe((data) => {
      console.log("Data returned from MyProperty on Load: " + JSON.stringify(data));
      this.properties = data; 
    },
    error => {
      alert("ERROR Retrieving My Property Ads: " + error);
    });
  }

  openProperty(property) {
    let modal = this.modalCtrl.create('PreviewPropertyModalPage', { property: property });
    modal.present();
  }
}
